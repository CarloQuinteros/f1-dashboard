# Spec Delta

## Purpose

Shows details about each current F1 team and connects teams to their drivers so users can move between the two.

## ADDED Requirements

### Requirement: Team profile page
The system SHALL provide a detail page for each current team, reachable by a stable URL, showing the team's name, logo or color identity, base and team principal.

#### Scenario: Open a team
- **WHEN** the user selects a team from a driver profile or the team list
- **THEN** that team's detail page is shown

#### Scenario: Direct link
- **WHEN** the user opens a team's URL directly or refreshes the page
- **THEN** the same team page is shown

#### Scenario: Unknown team
- **WHEN** the URL refers to a team that does not exist
- **THEN** a "team not found" message is shown with a link back to the home page

### Requirement: Team drivers
The system SHALL list the team's current drivers on the team page, and each listed driver SHALL link to that driver's profile.

#### Scenario: Drivers shown
- **WHEN** a team page is displayed
- **THEN** the team's current race drivers are listed

#### Scenario: Navigate to driver
- **WHEN** the user selects a driver on a team page
- **THEN** that driver's profile page opens

### Requirement: Team access from the app
The system SHALL give the user a way to reach every team's page from the app without first opening a driver.

#### Scenario: Browse teams
- **WHEN** the user opens the app
- **THEN** all current teams are reachable through a visible navigation entry or team list

### Requirement: Team page works without live data
The system SHALL show all team information from bundled data so the team page is complete when the live data API is unavailable.

#### Scenario: API unavailable
- **WHEN** the live data API is unavailable
- **THEN** the team page still shows its details and drivers
