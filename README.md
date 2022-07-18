# IMPORTANT
>- Branch of staging: `release/staging`
>- Branch of production: `release/production`

# DEVELOPMENT

- Decode DOT_ENV (base64 string) of staging deployment in [Deployment Settings](https://bitbucket.org/dapatvista/mypay-api-nodejs/admin/addon/admin/pipelines/deployment-settings) and put decoded value in `.env`
- To start: `yarn start`

# WHAT TO DO WHEN YOU CHANGE .ENV FILE

1. You may need to update:
- DOT_ENV_CI in [Repository Variables](https://bitbucket.org/dapatvista/mypay-api-nodejs/admin/addon/admin/pipelines/repository-variables)
- DOT_ENV in [Deployment Settings](https://bitbucket.org/dapatvista/mypay-api-nodejs/admin/addon/admin/pipelines/deployment-settings).
2. Check if pipeline passed
3. **NOTIFY TEAM MEMBERS AND MAKE SURE ALL MEMBERS ARE AWARE**

# Deploy/Update api using Bitbucket Pipeline
- Create PR and merge into branch `release/staging`. Pipeline will be triggered and deploy staging server for us.
- Create PR and merge into branch `release/production`. Pipeline will be triggered and deploy production server for us.

Results can be viewed at https://bitbucket.org/dapatvista/mypay-api-nodejs/addon/pipelines/deployments
