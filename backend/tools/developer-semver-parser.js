// 🔧 File: backend/tools/developer-semver-parser.js
// 🔗 Analizza versioni SemVer restituendo componenti e tag

const SEMVER_REGEX =
  /^(?<major>0|[1-9]\d*)\.(?<minor>0|[1-9]\d*)\.(?<patch>0|[1-9]\d*)(?:-(?<prerelease>[0-9A-Za-z-.]+))?(?:\+(?<build>[0-9A-Za-z-.]+))?$/;

module.exports = {
  async run({ params }) {
    const version = params.version?.trim();
    if (!version) {
      throw new Error('Inserisci una versione SemVer');
    }

    const match = version.match(SEMVER_REGEX);
    if (!match || !match.groups) {
      throw new Error('Versione non conforme a SemVer (es. 1.2.3-beta+build)');
    }

    const { major, minor, patch, prerelease, build } = match.groups;

    return {
      version,
      major: Number(major),
      minor: Number(minor),
      patch: Number(patch),
      prerelease: prerelease ? prerelease.split('.') : [],
      buildMetadata: build ? build.split('.') : [],
      stable: !prerelease,
    };
  },
};



