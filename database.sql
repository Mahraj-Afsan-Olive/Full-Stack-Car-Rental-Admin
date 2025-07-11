PGDMP      *                 }         
   Car-Rental    17.4    17.4 /    `           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            a           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            b           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            c           1262    16496 
   Car-Rental    DATABASE     r   CREATE DATABASE "Car-Rental" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en-US';
    DROP DATABASE "Car-Rental";
                     postgres    false                        3079    16497 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                        false            d           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                             false    2            �            1259    16671    cars    TABLE     �   CREATE TABLE public.cars (
    id integer NOT NULL,
    name character varying NOT NULL,
    location character varying NOT NULL,
    daily_rate numeric NOT NULL
);
    DROP TABLE public.cars;
       public         heap r       postgres    false            �            1259    16670    cars_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cars_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.cars_id_seq;
       public               postgres    false    228            e           0    0    cars_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.cars_id_seq OWNED BY public.cars.id;
          public               postgres    false    227            �            1259    16541    owner    TABLE     �   CREATE TABLE public.owner (
    id integer NOT NULL,
    name character varying NOT NULL,
    username character varying NOT NULL,
    "phoneNo" character varying NOT NULL,
    email character varying NOT NULL
);
    DROP TABLE public.owner;
       public         heap r       postgres    false            �            1259    16540    owner_id_seq    SEQUENCE     �   CREATE SEQUENCE public.owner_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.owner_id_seq;
       public               postgres    false    224            f           0    0    owner_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.owner_id_seq OWNED BY public.owner.id;
          public               postgres    false    223            �            1259    16521    payment    TABLE     y  CREATE TABLE public.payment (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "userId" integer NOT NULL,
    "userType" character varying NOT NULL,
    amount numeric NOT NULL,
    "phoneNo" character varying NOT NULL,
    status character varying DEFAULT 'pending'::character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.payment;
       public         heap r       postgres    false    2            �            1259    16662    rentals    TABLE     �   CREATE TABLE public.rentals (
    id integer NOT NULL,
    car_id integer NOT NULL,
    start_date timestamp without time zone NOT NULL,
    end_date timestamp without time zone NOT NULL,
    total_amount numeric NOT NULL
);
    DROP TABLE public.rentals;
       public         heap r       postgres    false            �            1259    16661    rentals_id_seq    SEQUENCE     �   CREATE SEQUENCE public.rentals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.rentals_id_seq;
       public               postgres    false    226            g           0    0    rentals_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.rentals_id_seq OWNED BY public.rentals.id;
          public               postgres    false    225            �            1259    16532    staff    TABLE     �   CREATE TABLE public.staff (
    id integer NOT NULL,
    name character varying NOT NULL,
    username character varying NOT NULL,
    "phoneNo" character varying NOT NULL,
    email character varying NOT NULL
);
    DROP TABLE public.staff;
       public         heap r       postgres    false            �            1259    16531    staff_id_seq    SEQUENCE     �   CREATE SEQUENCE public.staff_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.staff_id_seq;
       public               postgres    false    222            h           0    0    staff_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.staff_id_seq OWNED BY public.staff.id;
          public               postgres    false    221            �            1259    16509    user    TABLE     �   CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL
);
    DROP TABLE public."user";
       public         heap r       postgres    false            �            1259    16508    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public               postgres    false    219            i           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public               postgres    false    218            �           2604    16674    cars id    DEFAULT     b   ALTER TABLE ONLY public.cars ALTER COLUMN id SET DEFAULT nextval('public.cars_id_seq'::regclass);
 6   ALTER TABLE public.cars ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    228    227    228            �           2604    16544    owner id    DEFAULT     d   ALTER TABLE ONLY public.owner ALTER COLUMN id SET DEFAULT nextval('public.owner_id_seq'::regclass);
 7   ALTER TABLE public.owner ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    223    224    224            �           2604    16665 
   rentals id    DEFAULT     h   ALTER TABLE ONLY public.rentals ALTER COLUMN id SET DEFAULT nextval('public.rentals_id_seq'::regclass);
 9   ALTER TABLE public.rentals ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    225    226    226            �           2604    16535    staff id    DEFAULT     d   ALTER TABLE ONLY public.staff ALTER COLUMN id SET DEFAULT nextval('public.staff_id_seq'::regclass);
 7   ALTER TABLE public.staff ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    221    222    222            �           2604    16512    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    218    219    219            ]          0    16671    cars 
   TABLE DATA           >   COPY public.cars (id, name, location, daily_rate) FROM stdin;
    public               postgres    false    228   �4       Y          0    16541    owner 
   TABLE DATA           E   COPY public.owner (id, name, username, "phoneNo", email) FROM stdin;
    public               postgres    false    224   �5       U          0    16521    payment 
   TABLE DATA           c   COPY public.payment (id, "userId", "userType", amount, "phoneNo", status, "createdAt") FROM stdin;
    public               postgres    false    220   e6       [          0    16662    rentals 
   TABLE DATA           Q   COPY public.rentals (id, car_id, start_date, end_date, total_amount) FROM stdin;
    public               postgres    false    226   �7       W          0    16532    staff 
   TABLE DATA           E   COPY public.staff (id, name, username, "phoneNo", email) FROM stdin;
    public               postgres    false    222   �8       T          0    16509    user 
   TABLE DATA           ?   COPY public."user" (id, username, email, password) FROM stdin;
    public               postgres    false    219   9       j           0    0    cars_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.cars_id_seq', 15, true);
          public               postgres    false    227            k           0    0    owner_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.owner_id_seq', 3, true);
          public               postgres    false    223            l           0    0    rentals_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.rentals_id_seq', 25, true);
          public               postgres    false    225            m           0    0    staff_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.staff_id_seq', 3, true);
          public               postgres    false    221            n           0    0    user_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.user_id_seq', 9, true);
          public               postgres    false    218            �           2606    16669 &   rentals PK_2b10d04c95a8bfe85b506ba52ba 
   CONSTRAINT     f   ALTER TABLE ONLY public.rentals
    ADD CONSTRAINT "PK_2b10d04c95a8bfe85b506ba52ba" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.rentals DROP CONSTRAINT "PK_2b10d04c95a8bfe85b506ba52ba";
       public                 postgres    false    226            �           2606    16548 $   owner PK_8e86b6b9f94aece7d12d465dc0c 
   CONSTRAINT     d   ALTER TABLE ONLY public.owner
    ADD CONSTRAINT "PK_8e86b6b9f94aece7d12d465dc0c" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.owner DROP CONSTRAINT "PK_8e86b6b9f94aece7d12d465dc0c";
       public                 postgres    false    224            �           2606    16516 #   user PK_cace4a159ff9f2512dd42373760 
   CONSTRAINT     e   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760";
       public                 postgres    false    219            �           2606    16539 $   staff PK_e4ee98bb552756c180aec1e854a 
   CONSTRAINT     d   ALTER TABLE ONLY public.staff
    ADD CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.staff DROP CONSTRAINT "PK_e4ee98bb552756c180aec1e854a";
       public                 postgres    false    222            �           2606    16678 #   cars PK_fc218aa84e79b477d55322271b6 
   CONSTRAINT     c   ALTER TABLE ONLY public.cars
    ADD CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY (id);
 O   ALTER TABLE ONLY public.cars DROP CONSTRAINT "PK_fc218aa84e79b477d55322271b6";
       public                 postgres    false    228            �           2606    16530 &   payment PK_fcaec7df5adf9cac408c686b2ab 
   CONSTRAINT     f   ALTER TABLE ONLY public.payment
    ADD CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.payment DROP CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab";
       public                 postgres    false    220            �           2606    16518 #   user UQ_78a916df40e02a9deb1c4b75edb 
   CONSTRAINT     f   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb";
       public                 postgres    false    219            �           2606    16520 #   user UQ_e12875dfb3b1d92d7d7c5377e22 
   CONSTRAINT     c   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22";
       public                 postgres    false    219            �           2606    16679 &   rentals FK_243d136cb7fd3e65b4630fe6bf9    FK CONSTRAINT     �   ALTER TABLE ONLY public.rentals
    ADD CONSTRAINT "FK_243d136cb7fd3e65b4630fe6bf9" FOREIGN KEY (car_id) REFERENCES public.cars(id);
 R   ALTER TABLE ONLY public.rentals DROP CONSTRAINT "FK_243d136cb7fd3e65b4630fe6bf9";
       public               postgres    false    228    4800    226            ]   A  x�=��n�0�ϛ��%$��BR@
RU���Y���J�CO_��^���Ό3��=�/���l�P��4Mưf���J�;;Q�#irPD�â��hɪ0�OJ�!K#-`ŶM�<�#4
/
��P��U-��h�r�a�$(�ղ&/�����F�ȧ�Q΅�J{u�`2�`e��3h�J�ȉ���_��`��Q6�sؓ�(�H�<�q^:���^8��K2W�P�Yo
E˖�g؝����� �Z����%�^�3y�C��@'1�RQ(l6��F@ۋm�(ϰc�5�f�r	�[��xco�����__�$I~���      Y   l   x�3�����Sp�O��2�S�C#cS3sK��CjEbnAN�^r~.��NfY*g>�DR	@Qj�阓�������Z�����/p���B�C�Q4��qqq ��0�      U   /  x����j]1 ��_�}�AO[:�ҍ�!PnKoC�nIi�$�B �0��X���Z@���Cc�X��:�?�Z!���)0c.x|���t{<� �(.���tceN�:�u�YA�a���:����_���?�� ����������0^h�)��#Y4�
S���Т��������b�P�4���)՘F�V �a�ZB�t��V��"c��kwC9I5/��&���ڎ֚�6K4|�9���T.���,�kI=B��%�׀�e�"�+������zW�/���]�HJ�|��~!��      [   �   x���ۭ� �gg�.��W g�����#")OF����0��Q�H/Ŀ�������`�q,7��Z%2����Q�Ft�JGM��,�%�Z�J�����T�=���N
����+9=�q��B�^LjS&�漹�W�png&�Րx��~.�@�M�Q�M��7](Q��ile��}\5YQ���1��z�\G��N�8�5hC4���u�@��o��`��C�.�K�m����<��/��s�S�t      W   l   x�3��J�KU��,���2��LKs3Sc#C��CjEbnAN�^r~.�gHbyqfg	�BRAQm�锟��T����Zę���eHES� {06      T     x�e̽v�0 @�9<�3&X�b��
� ��K()�_����,�nT�!����(��� �?�RMo�i|���E��Í/;q��j�����],6��ǖٵ�����+K`f��AŊ���K��7���V�`B�^�����*�[w!�.�{$ᑸI����H������i��7EG
q�C�%!�����1�
��]�Sl���A\t������L,�x:%�/��T<b;�{��)��YRC;�J�I���=��-Z�)'�Č*ߪ�(spc     