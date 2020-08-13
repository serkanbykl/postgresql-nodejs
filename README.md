# Summer School Projects

# PostgreSQL Code

--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12rc1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: yazokulu; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE yazokulu WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Turkish_Turkey.1254' LC_CTYPE = 'Turkish_Turkey.1254';


ALTER DATABASE yazokulu OWNER TO postgres;

\connect yazokulu

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ogrenci_dt; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ogrenci_dt (
    id bigint NOT NULL,
    dogumtarihi date NOT NULL
);


ALTER TABLE public.ogrenci_dt OWNER TO postgres;

--
-- Name: ogrenci_hk; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ogrenci_hk (
    id bigint NOT NULL,
    ogrencihakkinda text NOT NULL
);


ALTER TABLE public.ogrenci_hk OWNER TO postgres;

--
-- Name: ogrenci_ilt; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ogrenci_ilt (
    id bigint NOT NULL,
    ogrenciiletisim text NOT NULL
);


ALTER TABLE public.ogrenci_ilt OWNER TO postgres;

--
-- Name: ogrenci; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ogrenci (
    id bigint,
    bolumid bigint NOT NULL,
    fakulteid bigint NOT NULL,
    ad text NOT NULL,
    soyad text NOT NULL,
    ogrenciusername text NOT NULL,
    ogrencipassword text NOT NULL
)
INHERITS (public.ogrenci_dt, public.ogrenci_hk, public.ogrenci_ilt);


ALTER TABLE public.ogrenci OWNER TO postgres;

--
-- Name: ogrenci_dt_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ogrenci_dt_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ogrenci_dt_id_seq OWNER TO postgres;

--
-- Name: ogrenci_dt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ogrenci_dt_id_seq OWNED BY public.ogrenci_dt.id;


--
-- Name: ogrenci_hk_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ogrenci_hk_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ogrenci_hk_id_seq OWNER TO postgres;

--
-- Name: ogrenci_hk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ogrenci_hk_id_seq OWNED BY public.ogrenci_hk.id;


--
-- Name: ogrenci_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ogrenci_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ogrenci_id_seq OWNER TO postgres;

--
-- Name: ogrenci_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ogrenci_id_seq OWNED BY public.ogrenci.id;


--
-- Name: ogrenci_ilt_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ogrenci_ilt_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ogrenci_ilt_id_seq OWNER TO postgres;

--
-- Name: ogrenci_ilt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ogrenci_ilt_id_seq OWNED BY public.ogrenci_ilt.id;


--
-- Name: ogrenci id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ogrenci ALTER COLUMN id SET DEFAULT nextval('public.ogrenci_id_seq'::regclass);


--
-- Name: ogrenci_dt id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ogrenci_dt ALTER COLUMN id SET DEFAULT nextval('public.ogrenci_dt_id_seq'::regclass);


--
-- Name: ogrenci_hk id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ogrenci_hk ALTER COLUMN id SET DEFAULT nextval('public.ogrenci_hk_id_seq'::regclass);


--
-- Name: ogrenci_ilt id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ogrenci_ilt ALTER COLUMN id SET DEFAULT nextval('public.ogrenci_ilt_id_seq'::regclass);


--
-- Data for Name: ogrenci; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ogrenci (id, dogumtarihi, ogrencihakkinda, ogrenciiletisim, bolumid, fakulteid, ad, soyad, ogrenciusername, ogrencipassword) VALUES
	(8, '2020-05-14', 'hakkında', 'iletişim', 5, 6, 'isim', 'soyisim', 'ogrenci', 'ogrenci');


--
-- Data for Name: ogrenci_dt; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: ogrenci_hk; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: ogrenci_ilt; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: ogrenci_dt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ogrenci_dt_id_seq', 1, false);


--
-- Name: ogrenci_hk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ogrenci_hk_id_seq', 1, false);


--
-- Name: ogrenci_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ogrenci_id_seq', 8, true);


--
-- Name: ogrenci_ilt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ogrenci_ilt_id_seq', 1, false);


--
-- Name: ogrenci ogrenci_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ogrenci
    ADD CONSTRAINT ogrenci_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

# Note: Please change the "const connectionString = 'postgressql://postgres:123456@localhost:5432/yazokulu'" part.
