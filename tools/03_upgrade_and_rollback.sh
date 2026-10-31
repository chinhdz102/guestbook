#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP="$ROOT/v1/guestbook"
OUT="${SUBMISSIONS:-$HOME/guestbook-submissions}"
: "${MY_NAMESPACE:?Set MY_NAMESPACE to your IBM Cloud Container Registry namespace}"
IMAGE="us.icr.io/${MY_NAMESPACE}/guestbook"
mkdir -p "$OUT"

cp "$ROOT/v2/guestbook/public/index.html" "$APP/public/index.html"
sed "s|__IMAGE__|$IMAGE|g" "$ROOT/tools/deployment.v2.yml.template" > "$APP/deployment.yml"
{
  echo '$ grep -nE "<title>|<h1>" v1/guestbook/public/index.html'
  grep -nE '<title>|<h1>' "$APP/public/index.html"
} > "$OUT/task08_index_v2.txt"

cd "$APP"
docker build -t "$IMAGE:v2" .
{
  echo "$ docker push $IMAGE:v2"
  docker push "$IMAGE:v2"
} 2>&1 | tee "$OUT/task06_push_v2_digest.txt"

{
  echo '$ kubectl apply -f deployment.yml'
  kubectl apply -f deployment.yml
} 2>&1 | tee "$OUT/task07_apply_deployment.txt"
kubectl rollout status deployment/guestbook --timeout=180s

{
  echo '$ kubectl rollout history deployment/guestbook'
  kubectl rollout history deployment/guestbook
  echo '$ kubectl rollout history deployment/guestbook --revision=1'
  kubectl rollout history deployment/guestbook --revision=1
  echo '$ kubectl rollout history deployment/guestbook --revision=2'
  kubectl rollout history deployment/guestbook --revision=2
} 2>&1 | tee "$OUT/task09_rollout_history.txt"

kubectl rollout undo deployment/guestbook --to-revision=1
kubectl rollout status deployment/guestbook --timeout=180s
{
  echo '$ kubectl get rs'
  kubectl get rs
} 2>&1 | tee "$OUT/task10_replica_sets_after_rollback.txt"

echo "Review task01 through task10 evidence under $OUT."
