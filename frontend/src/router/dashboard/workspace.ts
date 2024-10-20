import { startCase } from "lodash-es";
import type { RouteRecordRaw } from "vue-router";
import { t } from "@/plugins/i18n";
import DashboardLandingPage from "@/views/DashboardLandingPage.vue";
import MyIssues from "@/views/MyIssues.vue";
import {
  PROJECT_V1_ROUTE_DASHBOARD,
  INSTANCE_ROUTE_DASHBOARD,
  ENVIRONMENT_V1_ROUTE_DASHBOARD,
  WORKSPACE_HOME_MODULE,
  WORKSPACE_ROUTE_MY_ISSUES,
  WORKSPACE_ROUTE_SLOW_QUERY,
  WORKSPACE_ROUTE_EXPORT_CENTER,
  WORKSPACE_ROUTE_ANOMALY_CENTER,
  WORKSPACE_ROUTE_USER_PROFILE,
  WORKSPACE_ROUTE_SQL_REVIEW,
  WORKSPACE_ROUTE_SQL_REVIEW_CREATE,
  WORKSPACE_ROUTE_SQL_REVIEW_DETAIL,
  WORKSPACE_ROUTE_SCHEMA_TEMPLATE,
  WORKSPACE_ROUTE_CUSTOM_APPROVAL,
  WORKSPACE_ROUTE_RISK_CENTER,
  WORKSPACE_ROUTE_SENSITIVE_DATA,
  WORKSPACE_ROUTE_AUDIT_LOG,
  WORKSPACE_ROUTE_GITOPS,
  WORKSPACE_ROUTE_GITOPS_CREATE,
  WORKSPACE_ROUTE_GITOPS_DETAIL,
  WORKSPACE_ROUTE_SSO,
  WORKSPACE_ROUTE_SSO_CREATE,
  WORKSPACE_ROUTE_SSO_DETAIL,
  WORKSPACE_ROUTE_MAIL_DELIVERY,
  WORKSPACE_ROUTE_REVIEW_CENTER,
  WORKSPACE_ROUTE_MEMBERS,
  WORKSPACE_ROUTE_ROLES,
} from "./workspaceRoutes";

const workspaceRoutes: RouteRecordRaw[] = [
  {
    path: "",
    name: WORKSPACE_HOME_MODULE,
    components: {
      content: DashboardLandingPage,
      leftSidebar: () => import("@/views/DashboardSidebar.vue"),
    },
    props: {
      content: true,
      leftSidebar: true,
    },
  },
  {
    path: "issues",
    name: WORKSPACE_ROUTE_MY_ISSUES,
    meta: {
      getQuickActionList: () => {
        return [
          "quickaction.bb.database.schema.update",
          "quickaction.bb.database.data.update",
          "quickaction.bb.database.create",
          "quickaction.bb.instance.create",
          "quickaction.bb.issue.grant.request.querier",
          "quickaction.bb.issue.grant.request.exporter",
        ];
      },
    },
    components: {
      content: MyIssues,
      leftSidebar: () => import("@/views/DashboardSidebar.vue"),
    },
    props: {
      content: true,
      leftSidebar: true,
    },
  },
  {
    path: "projects",
    name: PROJECT_V1_ROUTE_DASHBOARD,
    meta: {
      title: () => t("common.projects"),
      getQuickActionList: () => {
        return ["quickaction.bb.project.create"];
      },
    },
    components: {
      content: () => import("@/views/ProjectDashboard.vue"),
      leftSidebar: () => import("@/views/DashboardSidebar.vue"),
    },
    props: { content: true, leftSidebar: true },
  },
  {
    path: "instances",
    name: INSTANCE_ROUTE_DASHBOARD,
    meta: {
      title: () => t("common.instances"),
      getQuickActionList: () => {
        return ["quickaction.bb.instance.create"];
      },
    },
    components: {
      content: () => import("@/views/InstanceDashboard.vue"),
      leftSidebar: () => import("@/views/DashboardSidebar.vue"),
    },
    props: { content: true, leftSidebar: true },
  },
  {
    path: "environments",
    name: ENVIRONMENT_V1_ROUTE_DASHBOARD,
    meta: {
      title: () => t("common.environments"),
      getQuickActionList: () => {
        return [
          "quickaction.bb.environment.create",
          "quickaction.bb.environment.reorder",
        ];
      },
      requiredWorkspacePermissionList: () => ["bb.environments.list"],
    },
    components: {
      content: () => import("@/views/EnvironmentDashboard.vue"),
      leftSidebar: () => import("@/views/DashboardSidebar.vue"),
    },
    props: { content: true, leftSidebar: true },
  },
  {
    path: "review-center",
    name: WORKSPACE_ROUTE_REVIEW_CENTER,
    meta: {
      title: () => startCase(t("review-center.self")),
    },
    components: {
      content: () => import("@/views/ReviewCenter/index.vue"),
      leftSidebar: () => import("@/views/DashboardSidebar.vue"),
    },
    props: {
      content: true,
      leftSidebar: true,
    },
  },
  {
    path: "export-center",
    name: WORKSPACE_ROUTE_EXPORT_CENTER,
    meta: {
      title: () => startCase(t("export-center.self")),
    },
    components: {
      content: () => import("@/views/ExportCenter/index.vue"),
      leftSidebar: () => import("@/views/DashboardSidebar.vue"),
    },
    props: {
      content: true,
      leftSidebar: true,
    },
  },
  {
    path: "anomaly-center",
    name: WORKSPACE_ROUTE_ANOMALY_CENTER,
    meta: { title: () => t("anomaly-center") },
    components: {
      content: () => import("@/views/AnomalyCenterDashboard.vue"),
      leftSidebar: () => import("@/views/DashboardSidebar.vue"),
    },
    props: {
      content: true,
      leftSidebar: true,
    },
  },
  {
    // "u" stands for user. Strictly speaking, it's not accurate because we
    // may refer to other principal type in the future. But from the endusers'
    // perspective, they are more familiar with the "user" concept.
    // We make an exception to use a shorthand here because it's a commonly
    // accessed endpoint, and maybe in the future, we will further provide a
    // shortlink such as users/<<email>>
    path: "users/:principalEmail",
    name: WORKSPACE_ROUTE_USER_PROFILE,
    components: {
      content: () => import("@/views/ProfileDashboard.vue"),
      leftSidebar: () => import("@/views/DashboardSidebar.vue"),
    },
    props: true,
  },
  {
    path: "403",
    name: "error.403",
    components: {
      content: () => import("@/views/Page403.vue"),
      leftSidebar: () => import("@/views/DashboardSidebar.vue"),
    },
    props: {
      content: true,
      leftSidebar: true,
    },
  },
  {
    path: "404",
    name: "error.404",
    components: {
      content: () => import("@/views/Page404.vue"),
      leftSidebar: () => import("@/views/DashboardSidebar.vue"),
    },
    props: {
      content: true,
      leftSidebar: true,
    },
  },
  {
    path: "sql-review",
    meta: {
      title: () => t("sql-review.title"),
      requiredWorkspacePermissionList: () => ["bb.policies.get"],
    },
    components: {
      content: () => import("@/layouts/SettingLayout.vue"),
      leftSidebar: () => import("@/views/DashboardSidebar.vue"),
    },
    props: {
      content: true,
      leftSidebar: true,
    },
    children: [
      {
        path: "",
        name: WORKSPACE_ROUTE_SQL_REVIEW,
        meta: {
          title: () => t("sql-review.title"),
          requiredWorkspacePermissionList: () => ["bb.policies.get"],
        },
        component: () => import("@/views/SettingWorkspaceSQLReview.vue"),
        props: true,
      },
      {
        path: "new",
        name: WORKSPACE_ROUTE_SQL_REVIEW_CREATE,
        meta: {
          title: () => t("sql-review.create.breadcrumb"),
          requiredWorkspacePermissionList: () => ["bb.policies.create"],
        },
        component: () => import("@/views/SettingWorkspaceSQLReviewCreate.vue"),
        props: true,
      },
      {
        path: ":sqlReviewPolicySlug",
        name: WORKSPACE_ROUTE_SQL_REVIEW_DETAIL,
        meta: {
          title: () => t("sql-review.title"),
          requiredWorkspacePermissionList: () => ["bb.policies.get"],
        },
        component: () => import("@/views/SettingWorkspaceSQLReviewDetail.vue"),
        props: true,
      },
    ],
  },
  {
    path: "gitops",
    meta: {
      title: () => t("settings.sidebar.gitops"),
    },
    components: {
      content: () => import("@/layouts/SettingLayout.vue"),
      leftSidebar: () => import("@/views/DashboardSidebar.vue"),
    },
    props: {
      content: true,
      leftSidebar: true,
    },
    children: [
      {
        path: "",
        name: WORKSPACE_ROUTE_GITOPS,
        meta: {
          requiredWorkspacePermissionList: () => ["bb.vcsProviders.list"],
        },
        component: () => import("@/views/SettingWorkspaceVCS.vue"),
        props: true,
      },
      {
        path: "new",
        name: WORKSPACE_ROUTE_GITOPS_CREATE,
        meta: {
          title: () => t("repository.add-git-provider"),
          requiredWorkspacePermissionList: () => ["bb.vcsProviders.create"],
        },
        component: () => import("@/views/SettingWorkspaceVCSCreate.vue"),
        props: true,
      },
      {
        path: ":vcsResourceId",
        name: WORKSPACE_ROUTE_GITOPS_DETAIL,
        meta: {
          requiredWorkspacePermissionList: () => ["bb.vcsProviders.get"],
        },
        component: () => import("@/views/SettingWorkspaceVCSDetail.vue"),
        props: true,
      },
    ],
  },
  {
    path: "sso",
    meta: {
      title: () => t("settings.sidebar.sso"),
    },
    components: {
      content: () => import("@/layouts/SettingLayout.vue"),
      leftSidebar: () => import("@/views/DashboardSidebar.vue"),
    },
    props: {
      content: true,
      leftSidebar: true,
    },
    children: [
      {
        path: "",
        name: WORKSPACE_ROUTE_SSO,
        meta: {
          requiredWorkspacePermissionList: () => ["bb.settings.get"],
        },
        component: () => import("@/views/SettingWorkspaceSSO.vue"),
      },
      {
        path: "new",
        name: WORKSPACE_ROUTE_SSO_CREATE,
        meta: {
          requiredWorkspacePermissionList: () => [
            "bb.identityProviders.create",
          ],
        },
        component: () => import("@/views/SettingWorkspaceSSODetail.vue"),
      },
      {
        path: ":ssoId",
        name: WORKSPACE_ROUTE_SSO_DETAIL,
        meta: {
          requiredWorkspacePermissionList: () => ["bb.identityProviders.get"],
        },
        component: () => import("@/views/SettingWorkspaceSSODetail.vue"),
        props: true,
      },
    ],
  },
  {
    path: "",
    components: {
      content: () => import("@/layouts/SettingLayout.vue"),
      leftSidebar: () => import("@/views/DashboardSidebar.vue"),
    },
    props: true,
    children: [
      {
        path: "custom-approval",
        name: WORKSPACE_ROUTE_CUSTOM_APPROVAL,
        meta: {
          title: () => t("custom-approval.self"),
          requiredWorkspacePermissionList: () => ["bb.settings.get"],
        },
        component: () => import("@/views/SettingWorkspaceCustomApproval.vue"),
        props: true,
      },
      {
        path: "schema-template",
        name: WORKSPACE_ROUTE_SCHEMA_TEMPLATE,
        meta: {
          title: () => startCase(t("schema-template.self")),
          requiredWorkspacePermissionList: () => ["bb.policies.get"],
        },
        component: () => import("@/views/SettingWorkspaceSchemaTemplate.vue"),
        props: true,
      },
      {
        path: "slow-query",
        name: WORKSPACE_ROUTE_SLOW_QUERY,
        meta: {
          title: () => startCase(t("slow-query.self")),
          requiredWorkspacePermissionList: () => ["bb.settings.get"],
        },
        component: () => import("@/views/SettingWorkspaceSlowQuery.vue"),
        props: true,
      },
      {
        path: "risk-center",
        name: WORKSPACE_ROUTE_RISK_CENTER,
        meta: {
          title: () => t("custom-approval.risk.risk-center"),
          requiredWorkspacePermissionList: () => [
            "bb.settings.get",
            "bb.risks.list",
          ],
        },
        component: () => import("@/views/SettingWorkspaceRiskCenter.vue"),
        props: true,
      },
      {
        path: "sensitive-data",
        name: WORKSPACE_ROUTE_SENSITIVE_DATA,
        meta: {
          title: () => t("settings.sidebar.sensitive-data"),
          requiredWorkspacePermissionList: () => ["bb.policies.get"],
        },
        component: () => import("@/views/SettingWorkspaceSensitiveData.vue"),
        props: true,
      },
      {
        path: "audit-log",
        name: WORKSPACE_ROUTE_AUDIT_LOG,
        meta: {
          title: () => t("settings.sidebar.audit-log"),
          requiredWorkspacePermissionList: () => ["bb.settings.get"],
        },
        component: () => import("@/views/SettingWorkspaceAuditLog.vue"),
        props: true,
      },
      {
        path: "mail-delivery",
        name: WORKSPACE_ROUTE_MAIL_DELIVERY,
        meta: {
          title: () => t("settings.sidebar.mail-delivery"),
          requiredWorkspacePermissionList: () => ["bb.settings.get"],
        },
        component: () => import("@/views/SettingWorkspaceMailDelivery.vue"),
      },
      {
        path: "members",
        name: WORKSPACE_ROUTE_MEMBERS,
        meta: {
          title: () => t("settings.sidebar.members-and-groups"),
          requiredWorkspacePermissionList: () => ["bb.policies.get"],
        },
        component: () => import("@/views/SettingWorkspaceMember.vue"),
        props: true,
      },
      {
        path: "roles",
        name: WORKSPACE_ROUTE_ROLES,
        meta: {
          title: () => t("settings.sidebar.custom-roles"),
          requiredWorkspacePermissionList: () => ["bb.roles.list"],
        },
        component: () => import("@/views/SettingWorkspaceRole.vue"),
        props: true,
      },
    ],
  },
];

export default workspaceRoutes;
