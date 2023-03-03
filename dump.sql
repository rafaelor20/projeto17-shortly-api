--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

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
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer,
    token character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "userId" integer,
    "visitCount" integer DEFAULT 0,
    "shortUrl" character varying(255),
    url character varying(255)
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255),
    password character varying(255),
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (1, '2023-03-03 13:42:23.319945', 1, 0, 'HFLEFCx39j', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (2, '2023-03-03 13:45:05.564086', 1, 0, 'W66Ka4nZ9s', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (3, '2023-03-03 13:53:38.127831', 1, 0, 'xyME3E1x1M', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (4, '2023-03-03 13:55:55.726411', 1, 0, 'AhD33Zh6DE', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (5, '2023-03-03 13:55:56.281878', 1, 0, 'XcL9gXqp9g', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (6, '2023-03-03 13:55:56.877918', 1, 0, 'qyuSK_XavK', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (7, '2023-03-03 13:55:57.469884', 1, 0, '1Fc6ByTyPs', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (8, '2023-03-03 13:55:58.094064', 1, 0, 'e48vtLui0w', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (9, '2023-03-03 13:55:58.675574', 1, 0, '_6f0Q8yvlW', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (10, '2023-03-03 13:55:59.278175', 1, 0, '-7oc7ugPMn', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (11, '2023-03-03 13:55:59.793538', 1, 0, 'Wsr1bQMBn_', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (12, '2023-03-03 13:56:00.433921', 1, 0, '_grzA_wg1x', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (13, '2023-03-03 13:56:00.9919', 1, 0, 'gEOeSITRqU', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (14, '2023-03-03 13:56:01.591302', 1, 0, '2lvzLM4qzX', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (15, '2023-03-03 13:56:02.249774', 1, 0, 'OPGunB2qQE', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (16, '2023-03-03 13:56:02.945906', 1, 0, '94GwqH9wvw', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (17, '2023-03-03 13:56:03.590471', 1, 0, '2Pq_yhEOAJ', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (18, '2023-03-03 13:56:04.260419', 1, 0, 'um_CSUgXy_', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (19, '2023-03-03 13:56:04.945681', 1, 0, 'wmeCFUyaOw', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (20, '2023-03-03 13:56:05.712139', 1, 0, '_exWRsrN7j', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (21, '2023-03-03 13:56:06.44984', 1, 0, 'Qr_H-0MP7n', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (22, '2023-03-03 14:05:41.647769', 1, 0, 'LW0yGpDVlS', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (23, '2023-03-03 14:06:10.117597', 1, 0, 'RBQ4jCO-wS', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (24, '2023-03-03 14:06:43.877486', 4, 0, 'yhmQeuo5Ve', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (25, '2023-03-03 14:06:44.541629', 4, 0, '0tCBaRIo89', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (26, '2023-03-03 14:06:45.186864', 4, 0, 'CTfmZ2fI5a', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (27, '2023-03-03 14:06:46.068313', 4, 0, 'Zwx74Ao-wK', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (28, '2023-03-03 14:10:45.96127', 4, 0, 'LRYGTq3tNM', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (29, '2023-03-03 14:10:47.029296', 4, 0, 'Ll0q8qrc6Q', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (30, '2023-03-03 14:10:48.28352', 4, 0, 'nIUkkijpHw', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (31, '2023-03-03 14:10:49.037961', 4, 0, 'QFih6T3G3k', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (32, '2023-03-03 14:10:54.433264', 4, 0, 'MkkFdCH6Bz', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (33, '2023-03-03 14:12:12.903738', 4, 0, 'MQXu50MKtr', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (34, '2023-03-03 14:12:14.208958', 4, 0, 'g1jxYV4INb', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (35, '2023-03-03 14:12:26.310797', 4, 0, 'U6pZyZ4QJJ', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (36, '2023-03-03 14:17:44.454564', 4, 0, '95T6yiLadX', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (37, '2023-03-03 14:17:45.553973', 4, 0, 'y6ojPZps6T', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (38, '2023-03-03 14:17:46.204258', 4, 0, 'AnjbK1npW_', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (39, '2023-03-03 14:17:59.876825', 4, 0, 'PufciybM4t', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (40, '2023-03-03 14:18:00.91469', 4, 0, 'sMims3W9Ra', 'https://www.steamgifts.com/giveaways/search?type=wishlist');
INSERT INTO public.urls VALUES (41, '2023-03-03 14:34:59.870535', 4, 0, 'JZZ4TOh8ZC', 'https://www.steamgifts.com/giveaways/search?type=wishlist');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'João', 'jo@driven.com.br', '$2b$10$cRGjUET7NNBxM.tPMyemy.TUALdHHHyrEkDip4d0yNl8GXc4DWYW.', '2023-03-03 10:41:07.756341');
INSERT INTO public.users VALUES (2, 'João', 'joao@driven.com.br', '$2b$10$8.kMxOeFo9NyvEm9s9.oL.V.maKtBfyd2dL1TYr8bMRnWRyxtwAre', '2023-03-03 10:41:13.523581');
INSERT INTO public.users VALUES (3, 'João', 'jodwewerfwerfweao@driven.com.br', '$2b$10$5d1X59XHDZ8iYP6KajXUS.tPevZQifusUYnEv4OcuE0qO9VEX2aE2', '2023-03-03 10:41:16.74712');
INSERT INTO public.users VALUES (4, 'João', 'joao1234@driven.com.br', '$2b$10$BPO81ZtCd6bxISDLY/uiF.syOCGbVeQXTc6iOP6ydGDgJpknMMCzq', '2023-03-03 10:50:47.945954');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 1, false);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 41, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

