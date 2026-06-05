# zeroclaw snap

Snap packaging for [ZeroClaw](https://github.com/clawrun-sh/clawrun) — a zero-config autonomous AI agent that wraps a native binary in a Node.js SDK.

## Building

```
snapcraft
```

Snapcraft will install `zeroclaw` from the npm registry, bundling Node.js 22. The zeroclaw package includes a pre-built platform binary; the snap stages it alongside the Node.js wrapper.

## Installing

```
sudo snap install --classic zeroclaw_<version>_amd64.snap --dangerous
```

## Usage

```
zeroclaw configure    # configure LLM backend and options
zeroclaw agent -m "do something"   # one-shot agent query
```

The background gateway service is installed and enabled as a systemd user unit the first time any `zeroclaw` command is run:

```
systemctl --user status zeroclaw
systemctl --user stop zeroclaw
systemctl --user start zeroclaw
```

Connect to the gateway at `http://localhost:3000` (WebSocket: `ws://localhost:3000/ws/chat`).

## Design notes

**Native binary wrapper** — ZeroClaw bundles a platform-specific native binary inside the npm package. The snap launcher uses `getBinaryPath()` from the zeroclaw SDK (via `snap/local/bin/zeroclaw-wrapper.js`) to locate and exec the correct binary, avoiding hardcoded paths that would break across package updates.

**Classic confinement** — ZeroClaw performs agentic tasks including optional browser automation, requiring broad system access.
