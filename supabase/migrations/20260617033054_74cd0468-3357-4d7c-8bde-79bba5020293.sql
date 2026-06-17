
-- =========================
-- ROLES
-- =========================
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- =========================
-- TIMESTAMP TRIGGER
-- =========================
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

-- =========================
-- SITE SETTINGS (singleton JSON groups: profile, stats, values, timeline, education, hero, seo)
-- =========================
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT ALL ON public.site_settings TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read site_settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins write site_settings" ON public.site_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER touch_site_settings BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================
-- SKILL CATEGORIES + ITEMS
-- =========================
CREATE TABLE public.skill_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.skill_categories TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.skill_categories TO authenticated;
GRANT ALL ON public.skill_categories TO service_role;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read skill_categories" ON public.skill_categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins write skill_categories" ON public.skill_categories FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER touch_skill_categories BEFORE UPDATE ON public.skill_categories FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.skill_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.skill_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level INT NOT NULL DEFAULT 80 CHECK (level BETWEEN 0 AND 100),
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.skill_items TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.skill_items TO authenticated;
GRANT ALL ON public.skill_items TO service_role;
ALTER TABLE public.skill_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read skill_items" ON public.skill_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins write skill_items" ON public.skill_items FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- =========================
-- PROJECTS
-- =========================
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  summary TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  year TEXT NOT NULL,
  github_url TEXT,
  demo_url TEXT,
  image_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read projects" ON public.projects FOR SELECT TO anon, authenticated USING (published = true OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins write projects" ON public.projects FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER touch_projects BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================
-- RESEARCH
-- =========================
CREATE TABLE public.research (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  venue TEXT NOT NULL,
  year TEXT NOT NULL,
  abstract TEXT NOT NULL,
  link TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.research TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.research TO authenticated;
GRANT ALL ON public.research TO service_role;
ALTER TABLE public.research ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read research" ON public.research FOR SELECT TO anon, authenticated USING (published = true OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins write research" ON public.research FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER touch_research BEFORE UPDATE ON public.research FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================
-- SERVICES
-- =========================
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  benefits TEXT[] NOT NULL DEFAULT '{}',
  icon TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read services" ON public.services FOR SELECT TO anon, authenticated USING (published = true OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins write services" ON public.services FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER touch_services BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================
-- ARTICLES (BLOG)
-- =========================
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT,
  category TEXT NOT NULL,
  read_minutes INT NOT NULL DEFAULT 5,
  cover_url TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  published_at DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.articles TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.articles TO authenticated;
GRANT ALL ON public.articles TO service_role;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read articles" ON public.articles FOR SELECT TO anon, authenticated USING (published = true OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins write articles" ON public.articles FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER touch_articles BEFORE UPDATE ON public.articles FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================
-- TESTIMONIALS
-- =========================
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  quote TEXT NOT NULL,
  avatar_url TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read testimonials" ON public.testimonials FOR SELECT TO anon, authenticated USING (published = true OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins write testimonials" ON public.testimonials FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER touch_testimonials BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================
-- CONTACT MESSAGES
-- =========================
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can send message" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admins read messages" ON public.contact_messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update messages" ON public.contact_messages FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins delete messages" ON public.contact_messages FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
