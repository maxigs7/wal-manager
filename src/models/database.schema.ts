export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      account: {
        Row: {
          createdAt: string;
          currency: Database['public']['Enums']['currency'];
          id: string;
          isPrimary: boolean;
          name: string;
          quotationId: Database['public']['Enums']['quotationType'] | null;
          type: Database['public']['Enums']['accountType'];
          userId: string;
        };
        Insert: {
          createdAt?: string;
          currency?: Database['public']['Enums']['currency'];
          id?: string;
          isPrimary?: boolean;
          name: string;
          quotationId?: Database['public']['Enums']['quotationType'] | null;
          type: Database['public']['Enums']['accountType'];
          userId: string;
        };
        Update: {
          createdAt?: string;
          currency?: Database['public']['Enums']['currency'];
          id?: string;
          isPrimary?: boolean;
          name?: string;
          quotationId?: Database['public']['Enums']['quotationType'] | null;
          type?: Database['public']['Enums']['accountType'];
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_account_quotation';
            columns: ['quotationId'];
            referencedRelation: 'quotation';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_account_user';
            columns: ['userId'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      category: {
        Row: {
          color: string | null;
          createdAt: string;
          icon: string | null;
          id: string;
          name: string;
          parentId: string | null;
          userId: string;
        };
        Insert: {
          color?: string | null;
          createdAt?: string;
          icon?: string | null;
          id?: string;
          name: string;
          parentId?: string | null;
          userId: string;
        };
        Update: {
          color?: string | null;
          createdAt?: string;
          icon?: string | null;
          id?: string;
          name?: string;
          parentId?: string | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_category_user';
            columns: ['userId'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_parent_category';
            columns: ['parentId'];
            referencedRelation: 'category';
            referencedColumns: ['id'];
          },
        ];
      };
      creditCard: {
        Row: {
          accountId: string | null;
          createdAt: string;
          id: string;
          name: string;
          type: Database['public']['Enums']['creditCardType'];
          userId: string;
        };
        Insert: {
          accountId?: string | null;
          createdAt?: string;
          id?: string;
          name: string;
          type: Database['public']['Enums']['creditCardType'];
          userId: string;
        };
        Update: {
          accountId?: string | null;
          createdAt?: string;
          id?: string;
          name?: string;
          type?: Database['public']['Enums']['creditCardType'];
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_creditCard_account';
            columns: ['accountId'];
            referencedRelation: 'account';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_creditCard_user';
            columns: ['userId'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      investment: {
        Row: {
          accountId: string;
          amount: number;
          annualRate: number | null;
          createdAt: string;
          days: number | null;
          description: string;
          dueDate: string | null;
          id: string;
          profit: number | null;
          type: Database['public']['Enums']['investmentType'];
          userId: string;
        };
        Insert: {
          accountId: string;
          amount: number;
          annualRate?: number | null;
          createdAt?: string;
          days?: number | null;
          description: string;
          dueDate?: string | null;
          id?: string;
          profit?: number | null;
          type: Database['public']['Enums']['investmentType'];
          userId: string;
        };
        Update: {
          accountId?: string;
          amount?: number;
          annualRate?: number | null;
          createdAt?: string;
          days?: number | null;
          description?: string;
          dueDate?: string | null;
          id?: string;
          profit?: number | null;
          type?: Database['public']['Enums']['investmentType'];
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_investment_account';
            columns: ['accountId'];
            referencedRelation: 'account';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_investment_user';
            columns: ['userId'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      movement: {
        Row: {
          accountId: string;
          amount: number;
          categoryId: string;
          createdAt: string;
          creditCardId: string | null;
          date: string;
          description: string | null;
          id: string;
          investmentId: string | null;
          isPaid: boolean;
          month: number;
          type: Database['public']['Enums']['movementType'];
          userId: string;
          year: number;
        };
        Insert: {
          accountId: string;
          amount: number;
          categoryId: string;
          createdAt?: string;
          creditCardId?: string | null;
          date: string;
          description?: string | null;
          id?: string;
          investmentId?: string | null;
          isPaid?: boolean;
          month: number;
          type: Database['public']['Enums']['movementType'];
          userId: string;
          year: number;
        };
        Update: {
          accountId?: string;
          amount?: number;
          categoryId?: string;
          createdAt?: string;
          creditCardId?: string | null;
          date?: string;
          description?: string | null;
          id?: string;
          investmentId?: string | null;
          isPaid?: boolean;
          month?: number;
          type?: Database['public']['Enums']['movementType'];
          userId?: string;
          year?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_movement_account';
            columns: ['accountId'];
            referencedRelation: 'account';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_movement_category';
            columns: ['categoryId'];
            referencedRelation: 'category';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_movement_creditCard';
            columns: ['creditCardId'];
            referencedRelation: 'creditCard';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_movement_investment';
            columns: ['investmentId'];
            referencedRelation: 'investment';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_movement_user';
            columns: ['userId'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      movementFee: {
        Row: {
          bucketId: string;
          feeNumber: number;
          id: string;
          totalFees: number;
        };
        Insert: {
          bucketId: string;
          feeNumber: number;
          id: string;
          totalFees: number;
        };
        Update: {
          bucketId?: string;
          feeNumber?: number;
          id?: string;
          totalFees?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_movement_movementFee';
            columns: ['id'];
            referencedRelation: 'movement';
            referencedColumns: ['id'];
          },
        ];
      };
      quotation: {
        Row: {
          currency: Database['public']['Enums']['currency'];
          dolarsiKey: string;
          id: Database['public']['Enums']['quotationType'];
          name: string;
        };
        Insert: {
          currency?: Database['public']['Enums']['currency'];
          dolarsiKey: string;
          id: Database['public']['Enums']['quotationType'];
          name: string;
        };
        Update: {
          currency?: Database['public']['Enums']['currency'];
          dolarsiKey?: string;
          id?: Database['public']['Enums']['quotationType'];
          name?: string;
        };
        Relationships: [];
      };
      transfer: {
        Row: {
          destinationMovementId: string;
          id: string;
          quotationAmount: number | null;
          sourceMovementId: string;
          userId: string;
        };
        Insert: {
          destinationMovementId: string;
          id?: string;
          quotationAmount?: number | null;
          sourceMovementId: string;
          userId: string;
        };
        Update: {
          destinationMovementId?: string;
          id?: string;
          quotationAmount?: number | null;
          sourceMovementId?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_movement_destinationMovement';
            columns: ['destinationMovementId'];
            referencedRelation: 'movement';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_movement_sourceMovement';
            columns: ['sourceMovementId'];
            referencedRelation: 'movement';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_transfer_user';
            columns: ['userId'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      deleteMovement: {
        Args: {
          id: string;
        };
        Returns: {
          accountId: string;
          amount: number;
          categoryId: string;
          createdAt: string;
          creditCardId: string | null;
          date: string;
          description: string | null;
          id: string;
          investmentId: string | null;
          isPaid: boolean;
          month: number;
          type: Database['public']['Enums']['movementType'];
          userId: string;
          year: number;
        }[];
      };
      getMovements: {
        Args: {
          pAccountId: string;
          pMonth: number;
          pYear: number;
        };
        Returns: {
          account: string;
          amount: number;
          creditCardId: string;
          creditCard: string;
          creditCardType: Database['public']['Enums']['creditCardType'];
          date: string;
          description: string;
          feeNumber: number;
          id: string;
          investmentId: string;
          isPaid: boolean;
          month: number;
          rootCategoryId: string;
          rootCategory: string;
          rootCategoryColor: string;
          rootCategoryIcon: string;
          subCategoryId: string;
          subCategory: string;
          totalFees: number;
          transferAccount: string;
          transferQuotationAmount: number;
          type: Database['public']['Enums']['movementType'];
          year: number;
        }[];
      };
      getMovementsSummary: {
        Args: {
          pAccountId: string;
          pCurrentMonth: number;
          pCurrentYear: number;
          pPreviousMonth: number;
          pPreviousYear: number;
        };
        Returns: {
          previousBalance: number;
          previousBalancePaid: number;
          previousExpenses: number;
          previousIncomes: number;
          previousInvestment: number;
          currentBalance: number;
          currentBalancePaid: number;
          currentExpenses: number;
          currentIncomes: number;
          currentInvestment: number;
        }[];
      };
      insertMovement: {
        Args: {
          pAccountId: string;
          pAmount: number;
          pCategoryId: string;
          pDate: string;
          pMonth: number;
          pType: Database['public']['Enums']['movementType'];
          pUserId: string;
          pYear: number;
          pCreateAll?: boolean;
          pCreditCardId?: string;
          pDescription?: string;
          pDestinationAccountId?: string;
          pFeeNumber?: number;
          pIsPaid?: boolean;
          pQuotationAmount?: number;
        };
        Returns: {
          accountId: string;
          amount: number;
          categoryId: string;
          createdAt: string;
          creditCardId: string | null;
          date: string;
          description: string | null;
          id: string;
          investmentId: string | null;
          isPaid: boolean;
          month: number;
          type: Database['public']['Enums']['movementType'];
          userId: string;
          year: number;
        }[];
      };
      updateMovement: {
        Args: {
          pAmount: number;
          pCategoryId: string;
          pDate: string;
          pId: string;
          pMonth: number;
          pYear: number;
          pCreditCardId?: string;
          pDescription?: string;
          pFeeNumber?: number;
          pIsPaid?: boolean;
        };
        Returns: {
          accountId: string;
          amount: number;
          categoryId: string;
          createdAt: string;
          creditCardId: string | null;
          date: string;
          description: string | null;
          id: string;
          investmentId: string | null;
          isPaid: boolean;
          month: number;
          type: Database['public']['Enums']['movementType'];
          userId: string;
          year: number;
        }[];
      };
    };
    Enums: {
      accountType: 'bank' | 'cash';
      creditCardType: 'amex' | 'carrefour' | 'mastercard' | 'naranja' | 'visa';
      currency: 'ars' | 'usd';
      investmentType: 'fci' | 'fixed' | 'uva';
      movementType: 'expenses' | 'incomes' | 'investment' | 'transfer';
      quotationType: 'blue' | 'mep' | 'ccl' | 'usd' | 'usd+';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'buckets_owner_fkey';
            columns: ['owner'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'objects_bucketId_fkey';
            columns: ['bucket_id'];
            referencedRelation: 'buckets';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'objects_owner_fkey';
            columns: ['owner'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: unknown;
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
