// === Definición de eventos ===

import { Observable } from "rxjs";

export abstract class Event {
}

export abstract class UpdateEvent extends Event {
  public abstract update (state: object): object;
}

export abstract class WatchEvent extends Event {
  public abstract watch (state: object): Observable<Event>;
}

export abstract class EffectEvent extends Event {
  public abstract effect (state: object): void;
}


// === Funciones de tipos ===

export function isUpdateEvent(event: Event): event is Event {
  return (event && (event.update !== undefined));
}

export function isWatchEvent(event: Event): event is Event {
  return (event && (event.watch !== undefined));
}

export function isEffectEvent(event: Event): event is Event {
  return (event && (event.effect !== undefined));
}
