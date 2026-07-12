-- =========================================================
-- HAMBALYO - Supabase Database Setup
-- Digital Wedding Message Wall
-- =========================================================
-- Run this entire script in the Supabase SQL Editor:
--   Dashboard → SQL Editor → New Query → Paste & Run
-- =========================================================


-- =========================================================
-- 1. CREATE TABLES
-- =========================================================

-- Messages table: stores all guest wishes
CREATE TABLE IF NOT EXISTS public.messages (
    id          UUID            DEFAULT gen_random_uuid() PRIMARY KEY,
    name        TEXT            NOT NULL,
    relationship TEXT           NOT NULL,
    message     TEXT            NOT NULL,
    created_at  TIMESTAMPTZ     DEFAULT now() NOT NULL
);

-- Settings table: stores couple names and other config
CREATE TABLE IF NOT EXISTS public.settings (
    id              INT4        PRIMARY KEY,
    couple_names    TEXT        NOT NULL DEFAULT 'Muna & Axmed'
);

-- Add a comment describing each table
COMMENT ON TABLE public.messages IS 'Guest wishes and messages for the wedding couple';
COMMENT ON TABLE public.settings IS 'Application settings such as couple names';


-- =========================================================
-- 2. ENABLE ROW LEVEL SECURITY (RLS)
-- =========================================================

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;


-- =========================================================
-- 3. RLS POLICIES — Messages Table
-- =========================================================

-- Allow anyone to READ all messages
CREATE POLICY "Allow public read access on messages"
    ON public.messages
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Allow anyone to INSERT new messages
CREATE POLICY "Allow public insert access on messages"
    ON public.messages
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- (Optional) Prevent updates and deletes from anonymous users
CREATE POLICY "Allow authenticated update on messages"
    ON public.messages
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on messages"
    ON public.messages
    FOR DELETE
    TO authenticated
    USING (true);


-- =========================================================
-- 4. RLS POLICIES — Settings Table
-- =========================================================

-- Allow anyone to READ settings
CREATE POLICY "Allow public read access on settings"
    ON public.settings
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Allow anyone to UPDATE settings (for the Customize modal)
CREATE POLICY "Allow public update access on settings"
    ON public.settings
    FOR UPDATE
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- Allow anyone to INSERT settings (for upsert on first use)
CREATE POLICY "Allow public insert access on settings"
    ON public.settings
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);


-- =========================================================
-- 5. ENABLE REALTIME
-- =========================================================

ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.settings;


-- =========================================================
-- 6. SEED DATA — Default Settings Row
-- =========================================================

INSERT INTO public.settings (id, couple_names)
VALUES (1, 'Muna & Axmed')
ON CONFLICT (id) DO NOTHING;


-- =========================================================
-- 7. (OPTIONAL) SEED DATA — Sample Messages
-- =========================================================
-- Uncomment the block below to pre-fill with sample wishes.

/*
INSERT INTO public.messages (name, relationship, message) VALUES
    ('Aisha',         'Saaxiib',  'Wishing you both a lifetime of love and happiness. The ceremony was beautiful.'),
    ('Hooyo & Aabo',  'Waalid',   'So proud of you both today. May your home be filled with peace and blessings.'),
    ('Jamaal',        'Walaal',   'Congratulations to my wonderful sibling! I can''t wait to see what the future holds for you both.');
*/


-- =========================================================
-- 8. (OPTIONAL) INDEXES FOR PERFORMANCE
-- =========================================================

CREATE INDEX IF NOT EXISTS idx_messages_relationship
    ON public.messages (relationship);

CREATE INDEX IF NOT EXISTS idx_messages_created_at
    ON public.messages (created_at DESC);


-- =========================================================
-- ✅ SETUP COMPLETE!
-- =========================================================
-- Next steps:
--   1. Go to your Supabase Dashboard → Settings → API
--   2. Copy your "Project URL" and "anon public" key
--   3. Paste them into .env.local:
--        NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
--        NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
--   4. Run `npm run dev` — it should show "Live Sync (Supabase)" ✅
-- =========================================================
