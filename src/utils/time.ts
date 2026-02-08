import { differenceInSeconds } from 'date-fns';

export function calculateSecondsPassed(lastInteract: number): number {
    const now = Date.now();
    if (lastInteract > now) return 0; // Future timestamp protection
    return differenceInSeconds(now, lastInteract);
}
