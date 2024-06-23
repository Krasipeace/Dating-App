export type PresenceState = {
    members: string[];
    add: (id: string) => void;
    remove: (id: string) => void;
    set: (id: string[]) => void;
}