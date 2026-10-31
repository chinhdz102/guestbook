#!/usr/bin/env bash
set -euo pipefail
OUT="${SUBMISSIONS:-$HOME/guestbook-submissions}"
mkdir -p "$OUT"

if kubectl get hpa guestbook >/dev/null 2>&1; then
  echo 'HPA guestbook already exists; inspect/delete it before repeating this experiment.' >&2
  exit 1
fi

# Capture the initial zero-replica moment as part of the assignment.
kubectl scale deployment/guestbook --replicas=0
kubectl wait --for=delete pod -l app=guestbook --timeout=120s || true
{
  echo '$ kubectl get deployment guestbook'
  kubectl get deployment guestbook
  echo '$ kubectl autoscale deployment guestbook --cpu-percent=5 --min=1 --max=10'
  kubectl autoscale deployment guestbook --cpu-percent=5 --min=1 --max=10
  echo '$ kubectl get hpa guestbook'
  kubectl get hpa guestbook
} 2>&1 | tee "$OUT/task04_hpa_initial.txt"

# The ordinary CPU-based HPA needs running pods to measure load.
kubectl scale deployment/guestbook --replicas=1
kubectl rollout status deployment/guestbook --timeout=180s
if ! kubectl get svc guestbook >/dev/null 2>&1; then
  kubectl expose deployment guestbook --name=guestbook --port=3000 --target-port=3000
fi
if ! kubectl get pod load-generator >/dev/null 2>&1; then
  kubectl run load-generator --image=busybox:1.36 --restart=Never --command -- /bin/sh -c 'while true; do wget -q -O- http://guestbook:3000/ >/dev/null 2>&1; done'
fi

echo 'Monitoring HPA replicas (up to 6 minutes)...'
scaled=0
for i in $(seq 1 36); do
  current="$(kubectl get hpa guestbook -o jsonpath='{.status.currentReplicas}' 2>/dev/null || true)"
  desired="$(kubectl get hpa guestbook -o jsonpath='{.status.desiredReplicas}' 2>/dev/null || true)"
  echo "Observation $i: current=${current:-NA}, desired=${desired:-NA}"
  if [[ "$current" =~ ^[0-9]+$ && "$current" -gt 1 ]]; then
    scaled=1
    break
  fi
  sleep 10
done
{
  echo '$ kubectl get hpa guestbook'
  kubectl get hpa guestbook
  echo '$ kubectl get deployments guestbook'
  kubectl get deployments guestbook
  echo '$ kubectl get pods -l app=guestbook'
  kubectl get pods -l app=guestbook
} 2>&1 | tee "$OUT/task05_hpa_scaled.txt"
kubectl delete pod load-generator --ignore-not-found --wait=false
if [ "$scaled" -ne 1 ]; then
  echo 'Warning: no scale-up verified; inspect kubectl top pods and kubectl describe hpa guestbook.' >&2
fi
echo 'Run tools/03_upgrade_and_rollback.sh next.'
