// pages/tweets.tsx
"use client"; // Menandai file ini sebagai komponen klien

import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';

interface Tweet {
    id: number; // Ganti dengan tipe data yang sesuai
    tweet: string; // Kolom yang ingin ditampilkan
    created_at: string; // Jika Anda ingin menampilkan tanggal pembuatan
}

const TweetsPage = () => {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTweets = async () => {
            const { data, error } = await supabase
                .from('tweets') // Pastikan nama tabel di sini adalah "tweets"
                .select('*');

            if (error) {
                setError(error.message);
            } else {
                setTweets(data || []); // Pastikan data tidak null
            }
            setLoading(false);
        };

        fetchTweets();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <html lang="en">
      <head>
        <title>Tweet Collection</title>
      </head>
      <body className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Tweet Collection</h1>
            <div className="grid gap-4 max-w-2xl mx-auto">
                {tweets.map(item => (
                    <div key={item.id} 
                         className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                        <p className="text-gray-800 text-lg mb-2">{item.tweet}</p>
                        <div className="flex items-center justify-between">
                            <time className="text-sm text-gray-500">
                                {new Date(item.created_at).toLocaleDateString('id-ID', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </time>
                        </div>
                    </div>
                ))}
            </div>
            {tweets.length === 0 && (
                <p className="text-center text-gray-500 mt-8">Belum ada tweet yang ditampilkan.</p>
            )}
        </div>
      </body>
      </html>
    );
};

export default TweetsPage;