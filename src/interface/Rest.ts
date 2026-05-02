export namespace Rest {
  export interface Movie {
    id?: string;
    title?: string;
    plot?: string;
    release?: string;
    backdrop?: string | null;
    thumbnail?: string | null;
    video?: string | null;
    categories?: Category[];
  }
  export interface Category {
    id?: string | null;
    name?: string | null;
    movies?: Movie[] | null;
  }
}
