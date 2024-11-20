--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2024-11-20 18:05:01

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
-- TOC entry 221 (class 1259 OID 16887)
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id bigint NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16886)
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_id_seq OWNER TO postgres;

--
-- TOC entry 4868 (class 0 OID 0)
-- Dependencies: 220
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- TOC entry 218 (class 1259 OID 16848)
-- Name: expert; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expert (
    id bigint NOT NULL,
    name character varying(150) NOT NULL,
    expertise_area text,
    contact character varying,
    image character varying NOT NULL
);


ALTER TABLE public.expert OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16847)
-- Name: expert_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expert_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.expert_id_seq OWNER TO postgres;

--
-- TOC entry 4869 (class 0 OID 0)
-- Dependencies: 217
-- Name: expert_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expert_id_seq OWNED BY public.expert.id;


--
-- TOC entry 216 (class 1259 OID 16839)
-- Name: plant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plant (
    id bigint NOT NULL,
    common_name character varying(150) NOT NULL,
    scientific_name character varying(200) NOT NULL,
    description text NOT NULL,
    habitat character varying(200),
    medicinal_uses text NOT NULL,
    preparation_method text NOT NULL,
    benefits text NOT NULL,
    precautions text,
    availability character varying(150),
    image character varying(255) NOT NULL,
    category_id bigint
);


ALTER TABLE public.plant OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16871)
-- Name: plant_expert; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plant_expert (
    expert_id bigint NOT NULL,
    plant_id bigint NOT NULL
);


ALTER TABLE public.plant_expert OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16838)
-- Name: plant_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plant_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.plant_id_seq OWNER TO postgres;

--
-- TOC entry 4870 (class 0 OID 0)
-- Dependencies: 215
-- Name: plant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plant_id_seq OWNED BY public.plant.id;


--
-- TOC entry 4704 (class 2604 OID 16890)
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- TOC entry 4703 (class 2604 OID 16851)
-- Name: expert id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert ALTER COLUMN id SET DEFAULT nextval('public.expert_id_seq'::regclass);


--
-- TOC entry 4702 (class 2604 OID 16842)
-- Name: plant id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plant ALTER COLUMN id SET DEFAULT nextval('public.plant_id_seq'::regclass);


--
-- TOC entry 4714 (class 2606 OID 16894)
-- Name: category category_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_name_key UNIQUE (name);


--
-- TOC entry 4716 (class 2606 OID 16892)
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- TOC entry 4710 (class 2606 OID 16855)
-- Name: expert expert_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert
    ADD CONSTRAINT expert_pkey PRIMARY KEY (id);


--
-- TOC entry 4712 (class 2606 OID 16875)
-- Name: plant_expert plant_expert_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plant_expert
    ADD CONSTRAINT plant_expert_pkey PRIMARY KEY (expert_id, plant_id);


--
-- TOC entry 4706 (class 2606 OID 16846)
-- Name: plant plant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plant
    ADD CONSTRAINT plant_pkey PRIMARY KEY (id);


--
-- TOC entry 4708 (class 2606 OID 24897)
-- Name: plant unique_scientific_name_constraint; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plant
    ADD CONSTRAINT unique_scientific_name_constraint UNIQUE (scientific_name);


--
-- TOC entry 4717 (class 2606 OID 16900)
-- Name: plant fk_category; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plant
    ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES public.category(id) ON DELETE CASCADE;


--
-- TOC entry 4718 (class 2606 OID 16876)
-- Name: plant_expert plant_expert_expert_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plant_expert
    ADD CONSTRAINT plant_expert_expert_id_fkey FOREIGN KEY (expert_id) REFERENCES public.expert(id) ON DELETE CASCADE;


--
-- TOC entry 4719 (class 2606 OID 16881)
-- Name: plant_expert plant_expert_plant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plant_expert
    ADD CONSTRAINT plant_expert_plant_id_fkey FOREIGN KEY (plant_id) REFERENCES public.plant(id) ON DELETE CASCADE;


-- Completed on 2024-11-20 18:05:01

--
-- PostgreSQL database dump complete
--

