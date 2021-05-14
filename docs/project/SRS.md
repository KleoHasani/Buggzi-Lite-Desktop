<div style="text-align: center;">
<h2>Software Requirements Specifications</h2>
<h3>Buggzi</h3>
<p>Authors: Kleo Hasani</p>
<i>SRS v1.0</i>
</div>

---

# Introduction

## Purpose

Buggzi is a cross platform bug tracking application for small teams and individual developers. Stay on track with Buggzi on any system.

## Audience

This software requirements specification (SRS) document will be availabe to developers, testers and project managers. This SRS is to be used as a
'big picture' for the developement of the software. The specifics of developement and design will be represented by their own documents.

## Definitions/Acronyms

-   Risks

    -   Risk of data loss. Creation of backups of the JSON project files are deligated to the consumer/user of this software. This users includes but are not limited to (Team/Individual).
    -   Rist of merge conflicts. Only one user should work on the project database at a time to prevent confict merge. This software is intended for small teams and indidvidual developers.

---

# Description

Buggzi is a cross platform software for small teams and individual developers. By being cross platform Buggzi is not limited to the operating system. Supported system will be Windows, Linux, and Mac. Buggzi will allow for a central place for tracking tickets (tickets/incomplete), (in-progress), and (completed). Buggzi will allow for a self contained database that can be copied into any project or system. Tickets include bugs, issues, features and general To-Do's for the projects lifeline.

## User Needs

This software is intended to be used by developers, testers, and project manajers involved in the software developement lifecycle.

---

# System Requirements

| System          | Architecture | Status     |
| :-------------- | :----------- | :--------- |
| Windows 10 OS   | x64-86       | (untested) |
| Debian 10 OS    | x64-86       | (untested) |
| Fedora 33 OS    | x64-86       | (untested) |
| Arch OS         | x64-86       | (untested) |
| macOS - Big Sur | x64-86       | (untested) |
| macOS - Big Sur | ARM          | (untested) |
