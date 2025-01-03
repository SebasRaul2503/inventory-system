/*==============================================================*/
/* Table: AMBIENTES                                             */
/*==============================================================*/
create table
      AMBIENTES (
            ID_AMBIENTE int not null auto_increment comment '',
            NOMBRE_AMBIENTE varchar(100) comment '',
            primary key (ID_AMBIENTE)
      );

/*==============================================================*/
/* Table: CATEGORIAS                                            */
/*==============================================================*/
create table
      CATEGORIAS (
            ID_CATEGORIA int not null auto_increment comment '',
            NOMBRE_CATEGORIA varchar(100) comment '',
            primary key (ID_CATEGORIA)
      );

/*==============================================================*/
/* Table: DESCRIPCIONES                                         */
/*==============================================================*/
create table
      DESCRIPCIONES (
            ID_DESCRIPCION int not null auto_increment comment '',
            ID_CATEGORIA int comment '',
            NOMBRE_DESCRIPCION varchar(100) comment '',
            primary key (ID_DESCRIPCION)
      );

/*==============================================================*/
/* Table: HISTORIAL_ITEM                                        */
/*==============================================================*/
create table
      HISTORIAL_ITEM (
            ID_HISTORIAL_ITEM bigint not null auto_increment comment '',
            ID_ELEMENTO bigint comment '',
            ID_AMBIENTE int comment '',
            ID_DESCRIPCION int comment '',
            ID_CATEGORIA int comment '',
            ID_USUARIO_MODIF bigint comment '',
            DETALLE varchar(500) comment '',
            ID_UGEL bigint comment '',
            FECHA_ADQUISICION date comment '',
            PRECIO decimal(4, 2) comment '',
            FECHA_INGRESO date comment '',
            IMAGEN varchar(100) comment '',
            ESTADO varchar(100) comment '',
            FECHA_MODIF datetime comment '',
            ACCION varchar(100) comment '',
            primary key (ID_HISTORIAL_ITEM)
      );

/*==============================================================*/
/* Table: HISTORIAL_SUCESOS                                     */
/*==============================================================*/
create table
      HISTORIAL_SUCESOS (
            ID_MOVIMIENTO bigint not null auto_increment comment '',
            ID_ELEMENTO bigint comment '',
            ID_USUARIO bigint comment '',
            FECHA_MOVIMIENTO datetime comment '',
            DETALLE_MOVIMIENTO varchar(100) comment '',
            primary key (ID_MOVIMIENTO)
      );

/*==============================================================*/
/* Table: ITEM                                                  */
/*==============================================================*/
create table
      ITEM (
            ID_ELEMENTO bigint not null auto_increment comment '',
            ID_AMBIENTE int comment '',
            ID_DESCRIPCION int comment '',
            DETALLE varchar(500) comment '',
            ID_CATEGORIA int comment '',
            ID_UGEL bigint comment '',
            FECHA_ADQUISICION date comment '',
            PRECIO decimal(4, 2) comment '',
            FECHA_INGRESO date comment '',
            IMAGEN varchar(100) comment '',
            ESTADO varchar(100) comment '',
            primary key (ID_ELEMENTO)
      );

/*==============================================================*/
/* Table: USUARIOS                                              */
/*==============================================================*/
create table
      USUARIOS (
            ID_USUARIO bigint not null auto_increment comment '',
            NOMBRES varchar(100) comment '',
            APELLIDOS varchar(100) comment '',
            USU varchar(64) comment '',
            PASS varchar(300) comment '',
            ROL varchar(100) comment '',
            primary key (ID_USUARIO)
      );

alter table DESCRIPCIONES add constraint FK_DESCRIPC_REFERENCE_CATEGORI foreign key (ID_CATEGORIA) references CATEGORIAS (ID_CATEGORIA);

alter table HISTORIAL_ITEM add constraint FK_HISTORIA_REFERENCE_ITEM foreign key (ID_ELEMENTO) references ITEM (ID_ELEMENTO);

alter table HISTORIAL_ITEM add constraint FK_HISTORIA_REFERENCE_AMBIENTE foreign key (ID_AMBIENTE) references AMBIENTES (ID_AMBIENTE);

alter table HISTORIAL_ITEM add constraint FK_HISTORIA_REFERENCE_DESCRIPC foreign key (ID_DESCRIPCION) references DESCRIPCIONES (ID_DESCRIPCION);

alter table HISTORIAL_ITEM add constraint FK_HISTORIA_REFERENCE_CATEGORI foreign key (ID_CATEGORIA) references CATEGORIAS (ID_CATEGORIA);

alter table HISTORIAL_ITEM add constraint FK_HISTORIA_REFERENCE_USUARIOS foreign key (ID_USUARIO_MODIF) references USUARIOS (ID_USUARIO);

alter table HISTORIAL_SUCESOS add constraint FK_HISTORIAL_SU_REFERENCE_ITEM foreign key (ID_ELEMENTO) references ITEM (ID_ELEMENTO);

alter table HISTORIAL_SUCESOS add constraint FK_HISTORIAL_SU_REFERENCE_USUARIOS foreign key (ID_USUARIO) references USUARIOS (ID_USUARIO);

alter table ITEM add constraint FK_ITEM_REFERENCE_DESCRIPC foreign key (ID_DESCRIPCION) references DESCRIPCIONES (ID_DESCRIPCION);

alter table ITEM add constraint FK_ITEM_REFERENCE_AMBIENTE foreign key (ID_AMBIENTE) references AMBIENTES (ID_AMBIENTE);

alter table ITEM add constraint FK_ITEM_REFERENCE_CATEGORI foreign key (ID_CATEGORIA) references CATEGORIAS (ID_CATEGORIA);