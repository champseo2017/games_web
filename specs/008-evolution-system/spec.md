# Spec-008: Evolution System (Digimon Style)

## Objective
To implement a "Digimon V-Pet" style evolution system where the pet transforms through 4 distinct stages based on care and time.

## Functional Requirements

### 1. Life Stages (Digimon Style)
The pet will progress through 4 standard V-Pet stages:
1.  **Digitama (Egg)**: The initial incubation state.
2.  **Baby I (Fresh)**: The hatched state. Weak, blob-like. (e.g., Botamon style)
3.  **Baby II (In-Training)**: More defined shape, maybe small legs or ears. (e.g., Koromon style)
4.  **Child (Rookie)**: First battle-ready form. Changes based on care. (e.g., Agumon/Betamon)
5.  **Adult (Champion)**: Mature form. The final stage for this MVP. (e.g., Greymon/Numemon)

### 2. Evolution Branches (The "Care Mistake" System)
Evolution to **Child** and **Adult** depends on **Care Mistakes** (CM):
- **Care Mistake**: Counted when Hunger/Energy/Hygiene hits 0 and is not fixed within 15 minutes (or immediately for MVP simplicity).
- **Branching Logic**:
    - **Baby II -> Child**:
        - 0-3 CMs -> **Agumon-type** (Good/Balanced Stats)
        - 4+ CMs -> **Betamon-type** (Average/Survival Stats)
    - **Child -> Adult**:
        - **Agumon-type**:
            - 0-2 CMs -> **Greymon** (Powerful, Heroic)
            - 3+ CMs -> **Tyrannomon** (Wild, Dinosaur)
        - **Betamon-type**:
            - 0-2 CMs -> **Seadramon** (Elegant, Water)
            - 3+ CMs -> **Numemon** (Slug, Trash - The "Fail" Evolution)

## Visual Concepts (PixiJS Shapes)
- **Baby I**: Black Blob with eyes.
- **Baby II**: Pink Blob with ears.
- **Child (Agumon)**: Yellow Raptor-like.
- **Child (Betamon)**: Green Amphibian-like.
- **Adult (Greymon)**: Orange Dinosaur with skull/helmet.
- **Adult (Numemon)**: Green Slug.

## State Requirements
- `stage`: 'egg' | 'baby1' | 'baby2' | 'child' | 'adult'
- `evolutionBranch`: 'AGU' | 'BETA' | 'GREY' | 'TYRANNO' | 'SEA' | 'NUME'
