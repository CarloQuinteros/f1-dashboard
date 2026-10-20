# Spec Delta

## Purpose

Shows a single driver's profile, career race wins and current-season standing, and stays usable when live data cannot be loaded.

## ADDED Requirements

### Requirement: Driver profile page
The system SHALL provide a detail page for each current-grid driver, reachable by a stable URL, showing the driver's photo, name, number, nationality with flag, date of birth and team.

#### Scenario: Open from the directory
- **WHEN** the user selects a driver from the directory
- **THEN** the profile page for that driver is shown with the profile details

#### Scenario: Direct link
- **WHEN** the user opens a driver's URL directly or refreshes the page
- **THEN** the same profile page is shown

#### Scenario: Unknown driver
- **WHEN** the URL refers to a driver that does not exist
- **THEN** a "driver not found" message is shown with a link back to the directory

### Requirement: Career race wins
The system SHALL display the driver's total career race wins, obtained from the live data source.

#### Scenario: Wins available
- **WHEN** the profile page loads and the live data source responds
- **THEN** the driver's career race win count is shown

#### Scenario: Driver with no wins
- **WHEN** the live data source reports zero wins for the driver
- **THEN** the page shows 0 rather than a missing value

### Requirement: Current season standing
The system SHALL display the driver's current-season championship position and points from the live data source.

#### Scenario: Standing available
- **WHEN** the live data source responds
- **THEN** the driver's championship position and points for the current season are shown

### Requirement: Graceful handling of live data failure
The system SHALL keep the profile page fully usable when live stats cannot be loaded, showing a loading state while waiting and an unavailable state on failure.

#### Scenario: Loading state
- **WHEN** live stats are being fetched
- **THEN** the stat areas show a loading indicator and the static profile is already visible

#### Scenario: API failure
- **WHEN** the live data request fails or times out
- **THEN** the stat areas show an "unavailable" state
- **AND** the static profile details remain visible

### Requirement: Link to team
The system SHALL link the driver's team name on the profile page to that team's detail page.

#### Scenario: Navigate to team
- **WHEN** the user selects the team name on a driver profile
- **THEN** that team's detail page opens
