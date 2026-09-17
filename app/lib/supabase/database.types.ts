export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type BookProductType = 'physical' | 'ebook';
export type BookPublicationStatus = 'draft' | 'published' | 'archived';

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          user_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      books: {
        Row: {
          id: string;
          product_type: BookProductType;
          status: BookPublicationStatus;
          title: string;
          slug: string;
          description: string;
          price_cents: number | null;
          cover_path: string | null;
          cover_alt: string;
          ebook_path: string | null;
          created_by: string;
          created_at: string;
          updated_at: string;
          published_at: string | null;
        };
        Insert: {
          id?: string;
          product_type?: BookProductType;
          status?: BookPublicationStatus;
          title: string;
          slug: string;
          description?: string;
          price_cents?: number | null;
          cover_path?: string | null;
          cover_alt?: string;
          ebook_path?: string | null;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
        Update: {
          id?: string;
          product_type?: BookProductType;
          status?: BookPublicationStatus;
          title?: string;
          slug?: string;
          description?: string;
          price_cents?: number | null;
          cover_path?: string | null;
          cover_alt?: string;
          ebook_path?: string | null;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      book_product_type: BookProductType;
      book_publication_status: BookPublicationStatus;
    };
    CompositeTypes: { [_ in never]: never };
  };
};
