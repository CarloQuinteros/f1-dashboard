# Spec Delta

## Purpose

Lets users see every driver on the current F1 grid in one place and quickly narrow the list by searching or filtering, on any screen size.

## ADDED Requirements

### Requirement: List all current-grid drivers
The system SHALL display every driver on the current F1 grid on the home page, each as a card showing at least the driver's photo, name, number and team.

#### Scenario: Home page shows the full grid
- **WHEN** the user opens the home page
- **THEN** a card is shown for each of the 22 current race drivers
- **AND** reserve or test drivers are not shown

#### Scenario: Directory works without live data
- **WHEN** the live data API is unavailable
- **THEN** the full driver list is still displayed

### Requirement: Search drivers by name
The system SHALL provide a search bar that filters the visible drivers as the user types, matching case-insensitively against the driver's name.

#### Scenario: Partial name match
- **WHEN** the user types "ver" into the search bar
- **THEN** only drivers whose name contains "ver" are shown

#### Scenario: No matches
- **WHEN** the search text matches no driver
- **THEN** the list shows a "no drivers found" message instead of cards

#### Scenario: Clearing the search
- **WHEN** the user clears the search bar
- **THEN** all drivers are shown again

### Requirement: Filter drivers by team
The system SHALL let the user filter the driver list by team, and the filter SHALL combine with the search text.

#### Scenario: Team filter
- **WHEN** the user selects a team in the filter
- **THEN** only that team's drivers are shown

#### Scenario: Search and filter together
- **WHEN** the user has a team selected and enters search text
- **THEN** only drivers matching both the team and the search text are shown

#### Scenario: Reset filters
- **WHEN** the user clears the team filter
- **THEN** the list reflects only the current search text

### Requirement: Responsive layout
The system SHALL adapt the driver directory to phone, tablet and desktop screen widths without horizontal scrolling and with touch-friendly controls.

#### Scenario: Phone width
- **WHEN** the viewport is phone-sized
- **THEN** cards are shown in a single column and the search bar and filters remain usable

#### Scenario: Wide screens
- **WHEN** the viewport is desktop-sized
- **THEN** cards are shown in a multi-column grid

### Requirement: Open a driver from the list
The system SHALL navigate to that driver's detail page when the user selects a driver card.

#### Scenario: Click a card
- **WHEN** the user clicks or taps a driver card
- **THEN** the driver's detail page opens
