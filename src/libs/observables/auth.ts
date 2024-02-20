import { Subject } from "rxjs/internal/Subject";

type AuthEvents = { type: "unauthorized" };

export const authSubject = new Subject<AuthEvents>();
