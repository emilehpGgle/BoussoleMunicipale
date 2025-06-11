// Types générés pour la base de données Supabase
// Ces types seront mis à jour automatiquement après la création des tables

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Enums pour les options de réponse
export type AgreementOptionKey = 'FA' | 'PA' | 'N' | 'PD' | 'FD' | 'IDK'
export type ImportanceOptionKey = 1 | 2 | 3 | 4 | 5
export type ImportanceDirectOptionKey = 'TI' | 'AI' | 'NI' | 'PI' | 'PTI' | 'IDK'

// Types pour les tables principales
export interface Database {
  public: {
    Tables: {
      questions: {
        Row: {
          id: string
          text: string
          category: string
          response_type: 'agreement' | 'importance_direct'
          description: string | null
          response_format: 'standard' | 'priority' | 'frequency' | 'financing' | null
          agreement_options: AgreementOptionKey[]
          importance_options: ImportanceOptionKey[]
          importance_direct_options: ImportanceDirectOptionKey[] | null
          custom_agreement_labels: Json | null
          custom_importance_direct_labels: Json | null
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          text: string
          category: string
          response_type: 'agreement' | 'importance_direct'
          description?: string | null
          response_format?: 'standard' | 'priority' | 'frequency' | 'financing' | null
          agreement_options?: AgreementOptionKey[]
          importance_options?: ImportanceOptionKey[]
          importance_direct_options?: ImportanceDirectOptionKey[] | null
          custom_agreement_labels?: Json | null
          custom_importance_direct_labels?: Json | null
          order_index: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          text?: string
          category?: string
          response_type?: 'agreement' | 'importance_direct'
          description?: string | null
          response_format?: 'standard' | 'priority' | 'frequency' | 'financing' | null
          agreement_options?: AgreementOptionKey[]
          importance_options?: ImportanceOptionKey[]
          importance_direct_options?: ImportanceDirectOptionKey[] | null
          custom_agreement_labels?: Json | null
          custom_importance_direct_labels?: Json | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      parties: {
        Row: {
          id: string
          name: string
          short_name: string | null
          leader: string
          logo_url: string
          website_url: string | null
          orientation: string | null
          main_ideas_summary: string | null
          strengths: Json
          reserves: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          short_name?: string | null
          leader: string
          logo_url: string
          website_url?: string | null
          orientation?: string | null
          main_ideas_summary?: string | null
          strengths?: Json
          reserves?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          short_name?: string | null
          leader?: string
          logo_url?: string
          website_url?: string | null
          orientation?: string | null
          main_ideas_summary?: string | null
          strengths?: Json
          reserves?: Json
          created_at?: string
          updated_at?: string
        }
      }
      party_positions: {
        Row: {
          id: string
          party_id: string
          question_id: string
          position: AgreementOptionKey | '?'
          source: string | null
          note: string | null
          quote: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          party_id: string
          question_id: string
          position: AgreementOptionKey | '?'
          source?: string | null
          note?: string | null
          quote?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          party_id?: string
          question_id?: string
          position?: AgreementOptionKey | '?'
          source?: string | null
          note?: string | null
          quote?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_sessions: {
        Row: {
          id: string
          session_token: string
          ip_address: string | null
          user_agent: string | null
          created_at: string
          updated_at: string
          expires_at: string | null
        }
        Insert: {
          id?: string
          session_token: string
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
          updated_at?: string
          expires_at?: string | null
        }
        Update: {
          id?: string
          session_token?: string
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
          updated_at?: string
          expires_at?: string | null
        }
      }
      user_responses: {
        Row: {
          id: string
          session_id: string
          question_id: string
          response_type: 'agreement' | 'importance_direct'
          agreement_value: AgreementOptionKey | null
          importance_direct_value: ImportanceDirectOptionKey | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          session_id: string
          question_id: string
          response_type: 'agreement' | 'importance_direct'
          agreement_value?: AgreementOptionKey | null
          importance_direct_value?: ImportanceDirectOptionKey | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          question_id?: string
          response_type?: 'agreement' | 'importance_direct'
          agreement_value?: AgreementOptionKey | null
          importance_direct_value?: ImportanceDirectOptionKey | null
          created_at?: string
          updated_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          session_id: string
          profile_data: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          session_id: string
          profile_data: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          profile_data?: Json
          created_at?: string
          updated_at?: string
        }
      }
      user_results: {
        Row: {
          id: string
          session_id: string
          results_data: Json
          political_position: Json | null
          completion_status: 'partial' | 'completed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          session_id: string
          results_data: Json
          political_position?: Json | null
          completion_status?: 'partial' | 'completed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          results_data?: Json
          political_position?: Json | null
          completion_status?: 'partial' | 'completed'
          created_at?: string
          updated_at?: string
        }
      }
      shared_results: {
        Row: {
          id: string
          share_id: string
          share_data: Json
          created_at: string
          updated_at: string
          expires_at: string
          access_count: number
          last_accessed_at: string | null
        }
        Insert: {
          id?: string
          share_id: string
          share_data: Json
          created_at?: string
          updated_at?: string
          expires_at?: string
          access_count?: number
          last_accessed_at?: string | null
        }
        Update: {
          id?: string
          share_id?: string
          share_data?: Json
          created_at?: string
          updated_at?: string
          expires_at?: string
          access_count?: number
          last_accessed_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 