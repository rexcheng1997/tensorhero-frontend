export type CreateEventHandlerFactory<
  T, E extends React.UIEvent
> = (data: T) => (event: E) => void;
