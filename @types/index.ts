export interface Article {
  title: string;
  email: string;
  bodyText: string;
  dateCreated: {
    _seconds: number;
  };
}
