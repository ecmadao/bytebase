package pg

// Framework code is generated by the generator.

import (
	"context"
	"database/sql"
	"fmt"
	"strings"

	"github.com/pkg/errors"

	"github.com/bytebase/bytebase/backend/plugin/advisor"
	"github.com/bytebase/bytebase/backend/plugin/parser/sql/ast"
	storepb "github.com/bytebase/bytebase/proto/generated-go/store"
)

var (
	_ advisor.Advisor = (*StatementPriorBackupCheckAdvisor)(nil)
)

func init() {
	advisor.Register(storepb.Engine_POSTGRES, advisor.PostgreSQLStatementPriorBackupCheck, &StatementPriorBackupCheckAdvisor{})
}

// StatementPriorBackupCheckAdvisor is the advisor checking for disallow mix DDL and DML.
type StatementPriorBackupCheckAdvisor struct {
}

// Check checks for disallow mix DDL and DML.
func (*StatementPriorBackupCheckAdvisor) Check(ctx advisor.Context, _ string) ([]*storepb.Advice, error) {
	var adviceList []*storepb.Advice
	if ctx.PreUpdateBackupDetail == nil || ctx.ChangeType != storepb.PlanCheckRunConfig_DML {
		adviceList = append(adviceList, &storepb.Advice{
			Status:  storepb.Advice_SUCCESS,
			Code:    advisor.Ok.Int32(),
			Title:   "OK",
			Content: "",
		})
		return adviceList, nil
	}
	stmtList, ok := ctx.AST.([]ast.Node)
	if !ok {
		return nil, errors.Errorf("failed to convert to Node")
	}

	level, err := advisor.NewStatusBySQLReviewRuleLevel(ctx.Rule.Level)
	if err != nil {
		return nil, err
	}
	title := string(ctx.Rule.Type)

	for _, stmt := range stmtList {
		var isDDL bool
		if _, ok := stmt.(ast.DDLNode); ok {
			isDDL = true
		}
		if isDDL {
			adviceList = append(adviceList, &storepb.Advice{
				Status:  level,
				Title:   title,
				Content: fmt.Sprintf("Data change can only run DML, \"%s\" is not DML", stmt.Text()),
				Code:    advisor.StatementPriorBackupCheck.Int32(),
				StartPosition: &storepb.Position{
					Line: int32(stmt.LastLine()),
				},
			})
		}
	}

	if !databaseExists(ctx.Context, ctx.Driver, extractDatabaseName(ctx.PreUpdateBackupDetail.Database)) {
		adviceList = append(adviceList, &storepb.Advice{
			Status:  level,
			Title:   title,
			Content: fmt.Sprintf("Need database %q to do prior backup but it does not exist", ctx.PreUpdateBackupDetail.Database),
			Code:    advisor.DatabaseNotExists.Int32(),
			StartPosition: &storepb.Position{
				Line: 0,
			},
		})
	}

	if len(adviceList) == 0 {
		adviceList = append(adviceList, &storepb.Advice{
			Status:  storepb.Advice_SUCCESS,
			Code:    advisor.Ok.Int32(),
			Title:   "OK",
			Content: "",
		})
	}

	return adviceList, nil
}

func extractDatabaseName(databaseUID string) string {
	segments := strings.Split(databaseUID, "/")
	return segments[len(segments)-1]
}

func databaseExists(ctx context.Context, driver *sql.DB, database string) bool {
	if driver == nil {
		return false
	}
	var count int
	if err := driver.QueryRowContext(ctx, "SELECT COUNT(*) FROM pg_database WHERE datname = $1", database).Scan(&count); err != nil {
		return false
	}
	return count > 0
}
