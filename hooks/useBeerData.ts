
import { useState, useEffect } from 'react';
import { supabase } from '@/app/integrations/supabase/client';
import { Database } from '@/app/integrations/supabase/types';

type Beer = Database['public']['Tables']['beers']['Row'];

export function useBeerData() {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBeers();
  }, []);

  const fetchBeers = async () => {
    try {
      setLoading(true);
      const { data, error: err } = await supabase
        .from('beers')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) throw err;
      setBeers(data || []);
    } catch (err) {
      console.error('Error fetching beers:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch beers');
    } finally {
      setLoading(false);
    }
  };

  const addBeer = async (beerData: Omit<Beer, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error: err } = await supabase
        .from('beers')
        .insert([beerData])
        .select();

      if (err) throw err;
      if (data) {
        setBeers([data[0], ...beers]);
      }
      return data?.[0];
    } catch (err) {
      console.error('Error adding beer:', err);
      throw err;
    }
  };

  return { beers, loading, error, fetchBeers, addBeer };
}
