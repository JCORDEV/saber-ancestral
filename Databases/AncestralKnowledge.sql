--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2024-11-20 18:04:35

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
-- TOC entry 4875 (class 0 OID 0)
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
-- TOC entry 4876 (class 0 OID 0)
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
-- TOC entry 4877 (class 0 OID 0)
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
-- TOC entry 4869 (class 0 OID 16887)
-- Dependencies: 221
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, name) FROM stdin;
47	AMARANTHACEAE
48	BIXACEAE
4	ACANTHACEAE
49	PAPAVERACEAE
3	CAMPANULACEAE
50	ASTERACEAE
53	ZINGIBERACEAE
1	MALVACEAE
25	PINACEAE
\.


--
-- TOC entry 4866 (class 0 OID 16848)
-- Dependencies: 218
-- Data for Name: expert; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expert (id, name, expertise_area, contact, image) FROM stdin;
2	Dr. Fern Meadow	Plant-based Healing	3219760968	Dr. Fern Meadow_1730324317187.jpg
1	Dr. Herbal	Medicinal Plants	3156789809	Dr. Herbal2_1729913019760.jpg
\.


--
-- TOC entry 4864 (class 0 OID 16839)
-- Dependencies: 216
-- Data for Name: plant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plant (id, common_name, scientific_name, description, habitat, medicinal_uses, preparation_method, benefits, precautions, availability, image, category_id) FROM stdin;
57	Jengibre	Zingiber officinale	El jengibre es una planta herbácea perenne con un tallo rígido. Puede alcanzar hasta 1 metro de altura y presenta hojas largas y delgadas de color verde brillante. La parte más utilizada es su rizoma (raíz subterránea), que es de forma irregular y de color marrón por fuera y amarillo por dentro.	Originaria del sureste asiático, el jengibre se cultiva ahora en muchas regiones tropicales y subtropicales del mundo, especialmente en India, China, y otras partes del trópico húmedo.	El jengibre es conocido por su capacidad para tratar dolores de cabeza, problemas hepáticos, malaire, dolores de estómago, parásitos, gases estomacales, dolor de vientre, infecciones intestinales, náuseas, gripe, resfriados y sus síntomas como dolor de garganta, indigestión, diarrea y estreñimiento. También se utiliza para tratar moretones, inflamaciones y nacidos.	Infusión: Machacar la raíz y hervir en agua; se puede beber como té.\r\nMacerado: Macerar hojas y raíz, poner a hervir y tomar el agua.\r\nTópico: Para moretones e inflamaciones, masticar la raíz con tabaco y aplicar en la parte afectada.	Propiedades antiinflamatorias, antioxidantes, analgésicas, digestivas, carminativas, y antiparasitarias. Ayuda en el alivio de náuseas, mejora la digestión, reduce el dolor y la inflamación, y fortalece el sistema inmunológico.	Algunas personas pueden experimentar reacciones alérgicas. Consultar a un profesional de la salud antes de usar en caso de embarazo, lactancia o si se están tomando medicamentos. El consumo excesivo puede causar molestias gastrointestinales.	Disponible en mercados locales, tiendas de productos naturales y supermercados.	Zingiber officinale.jpg	53
53	Achiote	Bixa orellana L.	Es una planta que se clasifica como arbusto que se siembra en huertos. Se reproduce por semillas. Sus frutos están envueltos en una cápsula. En su interior se guardan sus semillas color rojo carmesí. Las cuales se siembran en un suelo suelto, con buena cantidad de abono orgánico, se desarrolla fácilmente.	\N	Se usa las hojas y semilla. La semilla como condimento y para el dolor de oído. Las hojas para hematomas de los golpes o raspaduras, como desinflamante. Sirve para la inflamación de las amígdalas.	En el caso de condimento, se pone a secar y se usa para dar color y un sabor especial a las comidas. En el caso de golpes se usan sus hojas maceradas o molidas y se hacen pringues en la parte afectada. Para las amígdalas se toma un puñado de hojas frescas se hierven por cinco minutos, se deja reposar y se agrega una pizca de alumbre y con esta mezcla se hacen gárgaras.	Mejora la digestión, tiene propiedades antioxidantes y combate infecciones bacterianas.	Consumir en moderación, ya que en grandes cantidades puede causar reacciones adversas.	Común en mercados locales y fácil de cultivar en huertas.	Bixa orellana L..jpg	48
47	Bhindi, Bhindi tori	Abelmoschus esculentus (L.) Moench	De los frutos se hace un preparado mucilaginoso que se considera benéfico como sustituto del plasma o expansor del volumen sanguíneo.		De los frutos se hace un preparado mucilaginoso que se considera benéfico como sustituto del plasma o expansor del volumen sanguíneo. Las cápsulas inmaduras de la planta se utilizan como demulcente, diurético y las semillas de la planta se utilizan como antiespasmódico, cordial y estimulante.	rw3r	333			Abelmoschus esculentus (L.) Moench.jpg	1
54	Adormidera, Amapola, Amapola de opio	Papaver somniferum L	La adormidera es una planta herbácea anual que alcanza entre 50 y 150 cm de altura. Tiene hojas grandes, lobuladas y de color verde azulado. Sus flores son llamativas, de pétalos delicados, con colores que varían entre blanco, rosa, púrpura y violeta. Al marchitarse las flores, desarrollan cápsulas esféricas llenas de látex blanco, que es la fuente de compuestos opioides.		El principal uso medicinal de la adormidera es su látex, conocido como opio, que contiene alcaloides como la morfina, codeína y tebaina. Estos compuestos se utilizan en medicina para: alivio del dolor moderado a severo, para inducir el sueño en casos de insomnio grave, la codeína se usa en jarabes para aliviar la tos. En dosis controladas, se usa para tratar diarreas graves.	Planta muy usada en la zona alta del pie de monte costero, en proporciones muy reducidas de una hoja a dos por diez litros de agua. Se puede usar también por vía externa la hoja machacada en emplastos para problemas de la piel.	Especialmente útil para pacientes con dolor crónico. Ayuda a los pacientes con insomnio crónico. La codeína es un supresor de la tos potente. Los compuestos opioides pueden reducir la motilidad intestinal en casos graves.		La adormidera y sus derivados solo están disponibles mediante prescripción médica en la mayoría de los países.	Papaver somniferum L.jpg	49
48	Ran Bhendi	Abelmoschus ficulneus (L.) Wight & Arn.	Los frutos de la planta tienen un alto contenido de vitamina C que Abelmoschus esculentus.		Los frutos de la planta tienen un alto contenido de vitamina C que Abelmoschus esculentus.	feggegg	Los frutos de la planta tienen un alto contenido de vitamina C que Abelmoschus esculentus.			Abelmoschus ficulneus (L.) Wight & Arn..jpg	1
49	Kakrai	Abutilon pannosum (Forst.) Schlect.	Las hojas de la planta que contienen el mucílago se utilizan en almorranas y pectorales.		Las hojas de la planta que contienen el mucílago se utilizan en almorranas y pectorales.	Las hojas de la planta que contienen el mucílago se utilizan en almorranas y pectorales.	Las hojas de la planta que contienen el mucílago se utilizan en almorranas y pectorales.			Abutilon pannosum (Forst.) Schlect..jpg	1
55	Ambrosia, Altamisa	Ambrosia artemisiaefolia L.	Es una planta caracterizada como arbusto, de tallo semileñoso por lo que se reproduce especialmente por estaca. Las hojas expelen un olor desagradable característico.	Originaria de América del Norte, pero también se encuentra en América del Sur, Europa y otras regiones.	Tratamiento de trastornos digestivos, alivio del malestar menstrual, propiedades antinflamatorias y antioxidantes.	Se emplean las hojas, preparadas a baño maría hirviendo el agua durante unos diez minutos, para posteriormente agregarle las hojas y tapar, seguidamente se deja reposar y se toma como agua de tiempo (diariamente). Para el caso de extracto vegetal se deja fermentar durante unos quince días en agua de lluvia, adicionándole una cucharadita de levadura, posteriormente se filtra el preparado y se aplica a la planta en dosis de un litro por bomba de veinte litros.	Propiedades antiinflamatorias, antioxidantes, digestivas.	Puede causar reacciones alérgicas en personas sensibles. Consultar a un profesional de la salud antes de usarla.	Disponible en mercados locales y tiendas de productos naturales.	Ambrosia artemisiaefolia L..jpg	50
\.


--
-- TOC entry 4867 (class 0 OID 16871)
-- Dependencies: 219
-- Data for Name: plant_expert; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plant_expert (expert_id, plant_id) FROM stdin;
1	48
2	48
1	49
1	54
1	57
\.


--
-- TOC entry 4878 (class 0 OID 0)
-- Dependencies: 220
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 54, true);


--
-- TOC entry 4879 (class 0 OID 0)
-- Dependencies: 217
-- Name: expert_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expert_id_seq', 9, true);


--
-- TOC entry 4880 (class 0 OID 0)
-- Dependencies: 215
-- Name: plant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plant_id_seq', 57, true);


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


-- Completed on 2024-11-20 18:04:35

--
-- PostgreSQL database dump complete
--

