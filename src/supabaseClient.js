import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xmkheigzcbnpliumwtvj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhta2hlaWd6Y2JucGxpdW13dHZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NTAyNjAsImV4cCI6MjA2NzUyNjI2MH0.G18wCPk8Y-32UtluUWGaiteNSMvEICj6ojWW5r02014';

export const supabase = createClient(supabaseUrl, supabaseKey);