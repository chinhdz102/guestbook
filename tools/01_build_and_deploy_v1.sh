#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP="$ROOT/v1/guestbook"
OUT="${SUBMISSIONS:-$HOME/guestbook-submissions}"
: "${MY_NAMESPACE:?Set MY_NAMESPACE to your IBM Cloud Container Registry namespace}"
IMAGE="us.icr.io/${MY_NAMESPACE}/guestbook"
mkdir -p "$OUT"
test -f "$APP/main.go" || { echo 'Missing v1/guestbook/main.go' >&2; exit 1; }

cp "$APP/Dockerfile" "$OUT/task01_Dockerfile.txt"
{
  echo '$ grep -nE "<title>|<h1>" v1/guestbook/public/index.html'
  grep -nE '<title>|<h1>' "$APP/public/index.html"
} > "$OUT/task03_index_v1.txt"

sed "s|__IMAGE__|$IMAGE|g" "$ROOT/tools/deployment.v1.yml.template" > "$APP/deployment.yml"
cd "$APP"
docker build -t "$IMAGE:v1" .
docker push "$IMAGE:v1"
{
  echo '$ ibmcloud cr images'
  ibmcloud cr images
} 2>&1 | tee "$OUT/task02_ibmcloud_images.txt"

kubectl apply -f deployment.yml
kubectl rollout status deployment/guestbook --timeout=180s
echo 'V1 deployed. Run tools/02_hpa_and_load.sh next.'
