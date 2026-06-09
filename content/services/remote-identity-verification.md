---
title: "Remote Identity Verification"
layout: "remote-identity-verification"
description: "A Matlux Ltd prototype for passport-backed remote identity verification using Hologram, DIDComm, verifiable credentials, and trust infrastructure."

prototype_url: "https://passport.matlux.identification.vc/api/verify/new"

hero:
  eyebrow: "Digital trust prototype"
  title: "Remote Identity Verification"
  headline: "Passport-backed identity verification for trust-sensitive workflows."
  subtitle: "A working prototype for passport-backed identity checks using Hologram, verifiable credentials, and trust infrastructure."
  primary_button:
    text: "Discuss an identity workflow"
    url: "/contact/"
  secondary_button:
    text: "Try the live prototype"
    url: "https://passport.matlux.identification.vc/api/verify/new"

what_it_does:
  title: "What It Does"
  intro: "Matlux has built a working MVP flow for remote passport identity verification. It is designed to prove the architecture and integration path for teams that need to request, complete, and consume trust-sensitive checks remotely."
  steps:
    - title: "Requester creates a verification request"
      description: "A business user initiates a remote identity check for a customer, investor, counterparty, agent, or partner."
    - title: "Subject receives a link or QR"
      description: "The subject receives a verification email or QR that routes them into the Hologram-based verification flow."
    - title: "Subject completes Hologram verification"
      description: "The flow supports passport/NFC document reading, MRZ checks, and liveness callback handling."
    - title: "Requester receives a filtered result"
      description: "The business workflow receives only the verification result it needs, avoiding unnecessary exposure of raw passport data where possible."
  prototype_note: "You can run the current prototype here. It opens the current prototype request form."

why_it_matters:
  title: "Why It Matters"
  items:
    - "Reduces manual identity handling in remote onboarding and counterparty workflows."
    - "Keeps raw passport data out of business workflows where possible through privacy-conscious result filtering."
    - "Supports reusable credentials and trust-based integrations instead of one-off document collection."
    - "Helps teams test high-trust onboarding patterns before committing to a full production programme."

technical_shape:
  title: "Technical Shape"
  intro: "The prototype is deliberately architecture-led: enough implementation to exercise the full trust workflow, with room to adapt the persistence, retention, credential, and integration model for a specific organisation."
  items:
    - title: "Backend"
      description: "TypeScript/NestJS service architecture with request creation, callback handling, and filtered result delivery."
    - title: "Verification flow"
      description: "Hologram and DIDComm flow supporting passport NFC/MRZ verification and liveness callback handling."
    - title: "Credential direction"
      description: "Designed toward verifiable credential issuance, reuse, and trust infrastructure integration."
    - title: "Deployment shape"
      description: "Deployable service components that can be adapted to a regulated, financial, property, marketplace, or Web3 pilot."

use_cases:
  title: "Suitable Use Cases"
  items:
    - "Investor or partner onboarding"
    - "Remote customer checks"
    - "Property or investment workflows"
    - "Marketplace or agent trust"
    - "Web3 and verifiable credential pilots"

caveat:
  title: "Prototype Framing"
  content: "This is a prototype/MVP foundation, not an off-the-shelf compliance product. Matlux can adapt it to a specific workflow, data retention model, integration surface, and operational requirement without claiming production KYC/AML certification, biometric certification, or government approval."

cta:
  title: "Have a trust-sensitive workflow to prove?"
  content: "Matlux can help shape the architecture, integration path, and proof-of-concept delivery around your identity or credential workflow."
  primary_button:
    text: "Discuss an identity workflow"
    url: "/contact/"
  secondary_button:
    text: "Try the live prototype"
    url: "https://passport.matlux.identification.vc/api/verify/new"
---
