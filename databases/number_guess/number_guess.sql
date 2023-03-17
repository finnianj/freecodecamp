--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)

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

DROP DATABASE number_guess;
--
-- Name: number_guess; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE number_guess WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE number_guess OWNER TO freecodecamp;

\connect number_guess

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
-- Name: games; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.games (
    game_id integer NOT NULL,
    user_id integer NOT NULL,
    guesses integer
);


ALTER TABLE public.games OWNER TO freecodecamp;

--
-- Name: games_game_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.games_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.games_game_id_seq OWNER TO freecodecamp;

--
-- Name: games_game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.games_game_id_seq OWNED BY public.games.game_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    name character varying(22)
);


ALTER TABLE public.users OWNER TO freecodecamp;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO freecodecamp;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: games game_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.games_game_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.games VALUES (30, 24, 317);
INSERT INTO public.games VALUES (31, 24, 640);
INSERT INTO public.games VALUES (32, 25, 113);
INSERT INTO public.games VALUES (33, 25, 647);
INSERT INTO public.games VALUES (34, 24, 680);
INSERT INTO public.games VALUES (35, 24, 906);
INSERT INTO public.games VALUES (36, 24, 656);
INSERT INTO public.games VALUES (37, 26, 1);
INSERT INTO public.games VALUES (38, 26, 2);
INSERT INTO public.games VALUES (39, 26, 2);
INSERT INTO public.games VALUES (40, 27, 950);
INSERT INTO public.games VALUES (41, 27, 240);
INSERT INTO public.games VALUES (42, 28, 667);
INSERT INTO public.games VALUES (43, 28, 192);
INSERT INTO public.games VALUES (44, 27, 194);
INSERT INTO public.games VALUES (45, 27, 181);
INSERT INTO public.games VALUES (46, 27, 766);
INSERT INTO public.games VALUES (47, 29, 255);
INSERT INTO public.games VALUES (48, 29, 5);
INSERT INTO public.games VALUES (49, 30, 373);
INSERT INTO public.games VALUES (50, 30, 498);
INSERT INTO public.games VALUES (51, 29, 342);
INSERT INTO public.games VALUES (52, 29, 784);
INSERT INTO public.games VALUES (53, 29, 439);
INSERT INTO public.games VALUES (54, 31, 191);
INSERT INTO public.games VALUES (55, 31, 786);
INSERT INTO public.games VALUES (56, 32, 575);
INSERT INTO public.games VALUES (57, 32, 932);
INSERT INTO public.games VALUES (58, 31, 701);
INSERT INTO public.games VALUES (59, 31, 660);
INSERT INTO public.games VALUES (60, 31, 285);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.users VALUES (24, 'user_1679064677451');
INSERT INTO public.users VALUES (25, 'user_1679064677450');
INSERT INTO public.users VALUES (26, 'Finn');
INSERT INTO public.users VALUES (27, 'user_1679065002445');
INSERT INTO public.users VALUES (28, 'user_1679065002444');
INSERT INTO public.users VALUES (29, 'user_1679065141018');
INSERT INTO public.users VALUES (30, 'user_1679065141017');
INSERT INTO public.users VALUES (31, 'user_1679065168613');
INSERT INTO public.users VALUES (32, 'user_1679065168612');


--
-- Name: games_game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.games_game_id_seq', 60, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.users_user_id_seq', 32, true);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (game_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: games games_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--
