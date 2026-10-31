# IBM Guestbook – Kubernetes Final Project

Fork of [IBM Skills Network Guestbook](https://github.com/ibm-developer-skills-network/guestbook) with completed Dockerfiles and Kubernetes lab automation for the 10 final-project tasks.

## Files

- `v1/guestbook/Dockerfile` – completed multi-stage build, required COPY commands, EXPOSE 3000.
- `v1/guestbook/public/index.html` – original v1 title and heading.
- `v2/guestbook/Dockerfile`, `v2/guestbook/public/index.html` – v2 source.
- `tools/deployment.v1.yml.template`, `tools/deployment.v2.yml.template` – deployment revisions with distinct CPU requests/limits.
- `tools/01_build_and_deploy_v1.sh`, `02_hpa_and_load.sh`, `03_upgrade_and_rollback.sh` – generate **actual** cloud and Kubernetes evidence when executed in an authorized lab.

## Run in IBM Skills Network Labs

```bash
git clone https://github.com/chinhdz102/guestbook.git ~/guestbook
export MY_NAMESPACE="YOUR_IBM_CLOUD_REGISTRY_NAMESPACE"
ibmcloud cr login --client docker
bash ~/guestbook/tools/01_build_and_deploy_v1.sh
bash ~/guestbook/tools/02_hpa_and_load.sh
bash ~/guestbook/tools/03_upgrade_and_rollback.sh
```

Your lab must have Docker, `ibmcloud`, `kubectl`, a connected cluster, CPU metrics support and correct registry permissions. Outputs are saved to `~/guestbook-submissions/`. Inspect them before submitting.

**Note:** Forking and committing code is not equivalent to a completed Docker push, HPA scale-up or rollback. Those task outputs must be captured from a real cluster; this repo does not include fabricated command outputs.

Original code license: Apache-2.0 (see LICENSE).
