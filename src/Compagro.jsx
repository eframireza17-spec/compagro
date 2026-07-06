import React, { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle, BarChart3, Bell, Bot, Box, Camera, Check, ChevronRight,
  ClipboardEdit, EyeOff, Home, Leaf, Lock, LogOut, Menu, Package, ReceiptText,
  RefreshCw, Search, Send, Settings, ShoppingCart, TrendingUp, Wifi, X,
  UserPlus, LogIn, ArrowLeft, Users
} from 'lucide-react'
import compaLogo from './assets/compa-logo.png'

const STORAGE_KEY = 'compagro_local_v1'

const SEED_INVENTORY = [
  {
    "id": "s001",
    "name": "Sandía Jamboree",
    "quantity": 23.7,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Sandía",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2021-12-01"
  },
  {
    "id": "s002",
    "name": "Melón 1565",
    "quantity": 8,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Melón",
    "status": "Bajo",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s003",
    "name": "Melón Melosso",
    "quantity": 11.7,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Melón",
    "status": "Bajo",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s004",
    "name": "Melón D875",
    "quantity": 4.2,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Melón",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s005",
    "name": "Melón Gaviao",
    "quantity": 6.9,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Melón",
    "status": "Bajo",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s006",
    "name": "Melón Tacana",
    "quantity": 20,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Melón",
    "status": "Bajo",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s007",
    "name": "Melón HMC 23",
    "quantity": 3.5,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Melón",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s008",
    "name": "Melón Jamaica",
    "quantity": 19,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Melón",
    "status": "Bajo",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s009",
    "name": "Melón Sweet Spot",
    "quantity": 24.7,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Melón",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s010",
    "name": "Melón Sun Pac",
    "quantity": 9.4,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Melón",
    "status": "Bajo",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s011",
    "name": "Melón Versalles",
    "quantity": 9.2,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Melón",
    "status": "Bajo",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s012",
    "name": "Melón Sumer",
    "quantity": 31.5,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Melón",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s013",
    "name": "Melón Athena",
    "quantity": 16.8,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Melón",
    "status": "Bajo",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2021-03-01"
  },
  {
    "id": "s014",
    "name": "Melón La Joya",
    "quantity": 22.6,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Melón",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s015",
    "name": "Melón 8279",
    "quantity": 27.6,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Melón",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s016",
    "name": "Sandía Fascination",
    "quantity": 4,
    "unit": "semillas",
    "category": "Semillas",
    "subcategory": "Sandía",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s017",
    "name": "Melón RSI",
    "quantity": 1,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Melón",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s018",
    "name": "Melón Deluxe",
    "quantity": 2.1,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Melón",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s019",
    "name": "Melón 76628",
    "quantity": 0.6,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Melón",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s020",
    "name": "Melón Silverrock",
    "quantity": 1.6,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Melón",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s021",
    "name": "Melón Nitro",
    "quantity": 11,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Melón",
    "status": "Bajo",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s022",
    "name": "Melón",
    "quantity": 4,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Melón",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s023",
    "name": "Pepino Swayne",
    "quantity": 20,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Pepino",
    "status": "Bajo",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2021-01-01"
  },
  {
    "id": "s024",
    "name": "Pepino Bristol",
    "quantity": 400,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Pepino",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2021-01-01"
  },
  {
    "id": "s025",
    "name": "Pepino Modan Rz",
    "quantity": 5,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Pepino",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s026",
    "name": "Melón Valley Express",
    "quantity": 2,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Melón",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s027",
    "name": "Pepino Cetriolo (señor)",
    "quantity": 89,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Pepino",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2020-04-01"
  },
  {
    "id": "s028",
    "name": "Sandía Javelin",
    "quantity": 11,
    "unit": "semillas",
    "category": "Semillas",
    "subcategory": "Sandía",
    "status": "Bajo",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s029",
    "name": "Sandía Samen Erllas",
    "quantity": 10,
    "unit": "semillas",
    "category": "Semillas",
    "subcategory": "Sandía",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s030",
    "name": "Sandía Sibarita",
    "quantity": 10,
    "unit": "semillas",
    "category": "Semillas",
    "subcategory": "Sandía",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s031",
    "name": "Calabaza Magda",
    "quantity": 20,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Calabaza",
    "status": "Bajo",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2018-12-01"
  },
  {
    "id": "s032",
    "name": "Calabaza Patypan",
    "quantity": 393,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Calabaza",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s033",
    "name": "Calabaza Taybele",
    "quantity": 271,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Calabaza",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2021-06-01"
  },
  {
    "id": "s034",
    "name": "Calabaza Taybele (2)",
    "quantity": 310,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Calabaza",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2022-03-01"
  },
  {
    "id": "s035",
    "name": "Pepino Treasur",
    "quantity": 220,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Pepino",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s036",
    "name": "Calabaza Chabelo",
    "quantity": 390,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Calabaza",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2024-07-01"
  },
  {
    "id": "s037",
    "name": "Calabaza Estelo",
    "quantity": 248,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Calabaza",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2024-01-01"
  },
  {
    "id": "s038",
    "name": "Acelga Forpitook G",
    "quantity": 949,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Acelga",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2024-08-01"
  },
  {
    "id": "s039",
    "name": "Acelga Ruby Red",
    "quantity": 473,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Acelga",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2019-04-01"
  },
  {
    "id": "s040",
    "name": "Acelga Ruby Red",
    "quantity": 1,
    "unit": "lb",
    "category": "Semillas",
    "subcategory": "Acelga",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2019-04-01"
  },
  {
    "id": "s041",
    "name": "Acelga Ruby Red",
    "quantity": 460,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Acelga",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2019-04-01"
  },
  {
    "id": "s042",
    "name": "Acelga Ruby Red",
    "quantity": 443,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Acelga",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2019-04-01"
  },
  {
    "id": "s043",
    "name": "Acelga Ruby Red",
    "quantity": 301,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Acelga",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2019-04-01"
  },
  {
    "id": "s044",
    "name": "Arugula Wild Rocket",
    "quantity": 464,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Arugula",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2020-01-01"
  },
  {
    "id": "s045",
    "name": "Arugula Central Red F1",
    "quantity": 134,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Arugula",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2020-05-01"
  },
  {
    "id": "s046",
    "name": "Arugula Astro",
    "quantity": 519,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Arugula",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2020-04-01"
  },
  {
    "id": "s047",
    "name": "Arugula Esme OG",
    "quantity": 23,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Arugula",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2022-05-01"
  },
  {
    "id": "s048",
    "name": "Arugula Belleza",
    "quantity": 34,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Arugula",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2022-02-01"
  },
  {
    "id": "s049",
    "name": "Acelga Charbell F1",
    "quantity": 386,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Acelga",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2022-01-01"
  },
  {
    "id": "s050",
    "name": "Acelga Bright Yellow",
    "quantity": 50,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Acelga",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2022-03-01"
  },
  {
    "id": "s051",
    "name": "Acelga Bright Lights",
    "quantity": 144,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Acelga",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2020-05-01"
  },
  {
    "id": "s052",
    "name": "Betabel",
    "quantity": 212,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Betabel",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2025-04-01"
  },
  {
    "id": "s053",
    "name": "Betabel",
    "quantity": 496,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Betabel",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2025-04-01"
  },
  {
    "id": "s054",
    "name": "Espinaca",
    "quantity": 300,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Espinaca",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s055",
    "name": "Espinaca Santalia",
    "quantity": 1137,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Espinaca",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2025-04-01"
  },
  {
    "id": "s056",
    "name": "Espinaca Merkat",
    "quantity": 434,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Espinaca",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2025-04-01"
  },
  {
    "id": "s057",
    "name": "Espinaca Spirico",
    "quantity": 1297,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Espinaca",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2025-04-01"
  },
  {
    "id": "s058",
    "name": "Espinaca Tragopan",
    "quantity": 37,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Espinaca",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2025-04-01"
  },
  {
    "id": "s059",
    "name": "Espinaca Nun 05049",
    "quantity": 1166,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Espinaca",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2025-04-01"
  },
  {
    "id": "s060",
    "name": "Espinaca Nun 04034",
    "quantity": 1193,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Espinaca",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2025-04-01"
  },
  {
    "id": "s061",
    "name": "Espinaca Hammerhead",
    "quantity": 146,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Espinaca",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2025-04-01"
  },
  {
    "id": "s062",
    "name": "Espinaca F1",
    "quantity": 114,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Espinaca",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2025-04-01"
  },
  {
    "id": "s063",
    "name": "Cebolla Cartablanca",
    "quantity": 0,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Cebolla",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2010-03-01"
  },
  {
    "id": "s064",
    "name": "Cebolla SV4043NM",
    "quantity": 4,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Cebolla",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s065",
    "name": "Cebolla Sierra Blanca",
    "quantity": 24,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Cebolla",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s066",
    "name": "Cebolla Inteuwcdin",
    "quantity": 12,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Cebolla",
    "status": "Bajo",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s067",
    "name": "Cebolla Aspen",
    "quantity": 28,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Cebolla",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s068",
    "name": "Cebolla Nomad",
    "quantity": 239,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Cebolla",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2018-07-01"
  },
  {
    "id": "s069",
    "name": "Brocoli SV3413BL",
    "quantity": 18,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Brocoli",
    "status": "Bajo",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2016-03-01"
  },
  {
    "id": "s070",
    "name": "Brocoli BC1611",
    "quantity": 59,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Brocoli",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2022-10-01"
  },
  {
    "id": "s071",
    "name": "Brocoli BC1611",
    "quantity": 635,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Brocoli",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2025-01-01"
  },
  {
    "id": "s072",
    "name": "Coliflor Cielo Blanco",
    "quantity": 7,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Coliflor",
    "status": "Bajo",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s073",
    "name": "Coliflor Pensacola",
    "quantity": 11,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Coliflor",
    "status": "Bajo",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s074",
    "name": "Coliflor Floretto85",
    "quantity": 9,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Coliflor",
    "status": "Bajo",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2019-07-01"
  },
  {
    "id": "s075",
    "name": "Coliflor TSX C22",
    "quantity": 21,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Coliflor",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s076",
    "name": "Coliflor Floretto80",
    "quantity": 21,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Coliflor",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s077",
    "name": "Coliflor Fujiyama",
    "quantity": 10,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Coliflor",
    "status": "Bajo",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2020-03-01"
  },
  {
    "id": "s078",
    "name": "Coliflor Pensacola",
    "quantity": 8,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Coliflor",
    "status": "Bajo",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s079",
    "name": "Repollo Red Jewel",
    "quantity": 54,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Repollo",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2017-03-01"
  },
  {
    "id": "s080",
    "name": "Coliflor Pensacola",
    "quantity": 3,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Coliflor",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s081",
    "name": "Repollo Charman",
    "quantity": 97,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Repollo",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2019-05-01"
  },
  {
    "id": "s082",
    "name": "Repollo Gustus",
    "quantity": 19,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Repollo",
    "status": "Bajo",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2017-10-01"
  },
  {
    "id": "s083",
    "name": "Tomate Conan F1",
    "quantity": 15,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Tomate",
    "status": "Bajo",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2024-08-01"
  },
  {
    "id": "s084",
    "name": "Tomate Portos",
    "quantity": 3,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Tomate",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2024-01-01"
  },
  {
    "id": "s085",
    "name": "Tomate Big Beef F1",
    "quantity": 2.8,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Tomate",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2014-10-01"
  },
  {
    "id": "s086",
    "name": "Tomate Chocolate Cherry",
    "quantity": 0.8,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Tomate",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s087",
    "name": "Tomate Red & Yellow Pear Blend",
    "quantity": 0.8,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Tomate",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s088",
    "name": "Tomate Speckled Roman",
    "quantity": 1,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Tomate",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s089",
    "name": "Tomate San Marzano",
    "quantity": 0.8,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Tomate",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s090",
    "name": "Tomate Green Zebra",
    "quantity": 0.8,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Tomate",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s091",
    "name": "Tomate Black Krim",
    "quantity": 0.8,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Tomate",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s092",
    "name": "Tomate Beefsteak",
    "quantity": 1,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Tomate",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s093",
    "name": "Tomate Speckled Roman",
    "quantity": 0.8,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Tomate",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s094",
    "name": "Tomate",
    "quantity": 2.6,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Tomate",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2014-10-01"
  },
  {
    "id": "s095",
    "name": "Tomate Cheroke Purple",
    "quantity": 0.8,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Tomate",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s096",
    "name": "Tomate Bison",
    "quantity": 3.6,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Tomate",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2017-12-01"
  },
  {
    "id": "s097",
    "name": "Apio Tango",
    "quantity": 39,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Apio",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2017-04-01"
  },
  {
    "id": "s098",
    "name": "Apio Tango",
    "quantity": 39,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Apio",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2017-10-01"
  },
  {
    "id": "s099",
    "name": "Apio Tango",
    "quantity": 53.8,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Apio",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2017-10-01"
  },
  {
    "id": "s100",
    "name": "Apio Tango",
    "quantity": 39,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Apio",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2017-10-01"
  },
  {
    "id": "s101",
    "name": "Apio Tango",
    "quantity": 59,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Apio",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2017-10-01"
  },
  {
    "id": "s102",
    "name": "Apio Tango",
    "quantity": 48,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Apio",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2017-10-01"
  },
  {
    "id": "s103",
    "name": "Poro Zwitserse Reuzen",
    "quantity": 247,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Poro",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s104",
    "name": "Apio Kelvin",
    "quantity": 25000,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Apio",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2024-05-01"
  },
  {
    "id": "s105",
    "name": "Cebolla White Grano",
    "quantity": 85,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Cebolla",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s106",
    "name": "Repollo",
    "quantity": 3.8,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Repollo",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s107",
    "name": "Brocoli Maracabio",
    "quantity": 2.7,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Brocoli",
    "status": "Crítico",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": null
  },
  {
    "id": "s108",
    "name": "Brocoli SV3413BL",
    "quantity": 17.6,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Brocoli",
    "status": "Bajo",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2016-03-01"
  },
  {
    "id": "s109",
    "name": "Zanahoria Romance",
    "quantity": 170,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Zanahoria",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2023-08-01"
  },
  {
    "id": "s110",
    "name": "Zanahoria Rubyqueen",
    "quantity": 285,
    "unit": "g",
    "category": "Semillas",
    "subcategory": "Zanahoria",
    "status": "Normal",
    "lastMove": "Importado desde inventario agronómico",
    "testDate": "2023-03-01"
  }
]

const initialState = {
  onboardingDone: false,
  business: {
    name: '',
    location: '',
    size: '',
    activity: 'Agricultura',
    category: '',
    crop: '',
    controls: [],
    objectives: [],
    people: '',
    currentLog: '',
    challenges: [],
  },
  bot: { whatsapp: true, n8n: false, lastMessage: 'Se agregaron 20 litros de urea en el lote 3' },
  inventory: [
    { id: 'i1', name: 'Fertilizante Urea', quantity: 86, unit: 'kg', category: 'Fertilizantes', subcategory: '', status: 'Normal', lastMove: 'Actualizado hoy' },
    { id: 'i2', name: 'Insecticida', quantity: 1, unit: 'litro', category: 'Agroquímicos', subcategory: '', status: 'Crítico', lastMove: 'Salida reportada' },
    { id: 'i3', name: 'Diesel', quantity: 200, unit: 'litros', category: 'Combustible', subcategory: '', status: 'Normal', lastMove: 'Entrada registrada' },
    ...SEED_INVENTORY,
  ],
  alerts: [
    { id: 'al1', title: 'Inventario crítico de semillas', detail: 'Hay variedades en nivel crítico. Revisa Melón D875, Tomate Portos, Sandía Fascination y más.', level: 'Crítico', resolved: false },
    { id: 'al2', title: 'Insecticida crítico', detail: 'Queda 1 litro disponible. Conviene programar compra.', level: 'Crítico', resolved: false },
    { id: 'al3', title: 'Integración WhatsApp pendiente', detail: 'El flujo n8n puede recibir mensajes y convertirlos en registros operativos.', level: 'Atención', resolved: false },
  ],
  activities: [
    { id: 'a1', type: 'whatsapp', title: 'Mensaje recibido por WhatsApp', detail: 'Se agregaron 20 litros de urea en el lote 3', time: 'Ahora' },
    { id: 'a2', type: 'box', title: 'Inventario de semillas importado', detail: `${SEED_INVENTORY.length} registros del archivo del agrónomo`, time: 'Hoy' },
    { id: 'a3', type: 'n8n', title: 'Flujo n8n preparado', detail: 'Listo para conectar WhatsApp → n8n → Compagro', time: 'Hoy' },
  ],
  sales: {
    pin: '1234',
    monthlyTarget: 80000,
    records: [
      { id: 'v1', concept: 'Venta semillas pepino Bristol', amount: 4800, type: 'ingreso', date: '2026-06-15', client: 'Invernadero Norte' },
      { id: 'v2', concept: 'Compra fertilizante Urea 100kg', amount: 2350, type: 'egreso', date: '2026-06-14', client: 'Agroinsumos del Norte' },
      { id: 'v3', concept: 'Venta semillas espinaca', amount: 12600, type: 'ingreso', date: '2026-06-13', client: 'Clientes varios' },
    ],
  },
  providers: [
    { id: 'p1', name: 'Agroinsumos del Norte', category: 'Fertilizantes', lastEntry: 'Urea 100kg', trust: 'Alta' },
    { id: 'p2', name: 'Invernadero Norte', category: 'Semillas', lastEntry: 'Pepino Bristol', trust: 'Media' },
  ],
  staff: [
    { id: 'u1', name: 'Juan', role: 'Campo', channel: 'WhatsApp', lastMessage: 'Aplicación de urea en lote 3' },
    { id: 'u2', name: 'Pedro', role: 'Inventario', channel: 'WhatsApp', lastMessage: 'Entrada de semillas' },
  ],
}

const inventoryCategories = ['Todos', 'Semillas', 'Fertilizantes', 'Agroquímicos', 'Herramientas', 'Refacciones', 'Combustible', 'Otro']
const views = [
  { key: 'home', label: 'Inicio', icon: Home },
  { key: 'activity', label: 'Registrar actividad', icon: ClipboardEdit },
  { key: 'inventory', label: 'Inventario', icon: Package },
  { key: 'alerts', label: 'Alertas', icon: Bell },
  { key: 'purchases', label: 'Compras', icon: ShoppingCart },
  { key: 'providers', label: 'Proveedores', icon: Box },
  { key: 'staff', label: 'Personal', icon: Users },
  { key: 'reports', label: 'Reportes', icon: BarChart3 },
  { key: 'bot', label: 'Bot conectado', icon: Bot },
  { key: 'settings', label: 'Configuración', icon: Settings },
]

function uid(prefix = 'id') { return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}` }
function statusFor(qty, unit = '') {
  const n = Number(qty || 0)
  if (unit === 'semillas') return n <= 10 ? 'Crítico' : n <= 50 ? 'Bajo' : 'Normal'
  return n <= 5 ? 'Crítico' : n <= 20 ? 'Bajo' : 'Normal'
}
function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? { ...initialState, ...JSON.parse(stored) } : initialState
  } catch { return initialState }
}
function resetState() { localStorage.removeItem(STORAGE_KEY); window.location.reload() }
function Logo({ className = 'h-12 w-12' }) {
  return (
    <span className={`${className} inline-flex shrink-0 items-center justify-center rounded-[24px] bg-[#F3EBD8] p-2 shadow-[inset_0_0_0_1px_rgba(21,92,53,0.08),0_6px_16px_rgba(21,92,53,0.06)]`}>
      <img src={compaLogo} alt="Compagro" className="h-full w-full object-contain" />
    </span>
  )
}
function Card({ children, className = '' }) { return <section className={`rounded-[28px] border border-[#E8DDC9] bg-[#FFFCF5] shadow-[0_18px_50px_rgba(31,92,59,0.06)] ${className}`}>{children}</section> }
function IconCircle({ children, tone = 'green', className = '' }) {
  const tones = { green: 'bg-[#EAF7E7] text-[#11733F]', deep: 'bg-[#155C35] text-white', amber: 'bg-[#FFF5D9] text-[#B87500]', red: 'bg-[#FFE7E6] text-[#D9534F]', blue: 'bg-[#E5F5FF] text-[#229ED9]', purple: 'bg-[#F3EEFF] text-[#7C3AED]' }
  return <span className={`grid place-items-center rounded-2xl ${tones[tone]} ${className}`}>{children}</span>
}
function StatusPill({ status }) {
  const map = { Normal: 'bg-[#EAF7E7] text-[#155C35]', Bajo: 'bg-[#FFF5D9] text-[#B87500]', Crítico: 'bg-[#FFE7E6] text-[#D9534F]' }
  return <span className={`rounded-full px-3 py-1 text-xs font-black ${map[status] || map.Normal}`}>{status}</span>
}

function Landing({ onRegister, onLogin }) {
  return (
    <main className="min-h-screen bg-[#F8F1E3] px-4 py-8 font-[Inter,ui-sans-serif,system-ui] text-[#14251B]">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col items-center justify-center text-center">
        <div className="mb-6">
          <Logo className="h-40 w-40" />
        </div>
        <p className="text-sm font-black uppercase tracking-[0.24em] text-[#155C35]/70">Compagro</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-[#155C35] sm:text-5xl">Tu compa operativo con IA</h1>
        <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-black/55">
          Registra tu operación, controla inventario, conecta mensajes de campo y recibe alertas inteligentes desde un solo panel.
        </p>
        <div className="mt-8 grid w-full max-w-md gap-3 sm:grid-cols-2">
          <button type="button" onClick={onRegister} className="flex items-center justify-center gap-2 rounded-2xl bg-[#155C35] px-5 py-4 font-black text-white shadow-sm transition active:scale-[.98]">
            <UserPlus size={20} /> Registrar
          </button>
          <button type="button" onClick={onLogin} className="flex items-center justify-center gap-2 rounded-2xl border border-[#155C35]/20 bg-white px-5 py-4 font-black text-[#155C35] shadow-sm transition active:scale-[.98]">
            <LogIn size={20} /> Iniciar sesión
          </button>
        </div>
        <p className="mt-5 max-w-md text-xs font-semibold text-[#14251B]/45">
          Tus datos quedan guardados en este navegador para personalizar tu experiencia mientras configuramos la base de datos final.
        </p>
      </section>
    </main>
  )
}

function Pill({ children, active, onClick }) {
  return <button type="button" onClick={onClick} className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition active:scale-[.98] ${active ? 'border-[#155C35] bg-[#155C35] text-white' : 'border-[#E8DDC9] bg-white text-[#17251C] hover:border-[#155C35]/40'}`}>{children}</button>
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-extrabold text-[#155C35]">{label}</span>
      <input value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-2xl border border-[#E8DDC9] bg-white px-4 py-4 text-base outline-none transition focus:border-[#155C35] focus:ring-4 focus:ring-[#A7D7B5]/30" />
    </label>
  )
}

function Onboarding({ data, updateBusiness, toggleBusinessArray, step, setStep, finishOnboarding, goBack }) {
  const activityOptions = ['Agricultura', 'Ganadería', 'Servicios agrícolas', 'Comercialización agropecuaria', 'Acuacultura', 'Forestal', 'Otro']
  const categoryOptions = {
    Agricultura: ['Granos', 'Hortalizas', 'Frutales', 'Invernaderos', 'Berries', 'Cultivos industriales', 'Ornamentales', 'Viveros', 'Otro'],
    Ganadería: ['Bovino de carne', 'Bovino lechero', 'Porcicultura', 'Avícola', 'Ovino', 'Caprino', 'Engorda', 'Producción mixta', 'Otro'],
    'Servicios agrícolas': ['Maquinaria', 'Aplicación de insumos', 'Riego', 'Asesoría técnica', 'Transporte', 'Contratistas agrícolas', 'Otro'],
    'Comercialización agropecuaria': ['Compra/venta de granos', 'Fertilizantes', 'Agroquímicos', 'Semillas', 'Insumos', 'Distribución', 'Otro'],
    Acuacultura: ['Tilapia', 'Camarón', 'Trucha', 'Producción mixta', 'Otro'],
    Forestal: ['Madera', 'Vivero forestal', 'Resina', 'Servicios forestales', 'Otro'],
    Otro: ['Operación mixta', 'Distribución', 'Servicios', 'Otro'],
  }
  const cropOptions = {
    Granos: ['Maíz', 'Trigo', 'Cebada', 'Avena', 'Sorgo', 'Frijol', 'Garbanzo', 'Arroz', 'Canola', 'Otro'],
    Hortalizas: ['Tomate', 'Chile', 'Cebolla', 'Lechuga', 'Pepino', 'Zanahoria', 'Papa', 'Calabaza', 'Otro'],
    Frutales: ['Limón', 'Mango', 'Naranja', 'Aguacate', 'Manzana', 'Uva', 'Durazno', 'Plátano', 'Otro'],
  }
  const controlOptions = ['Inventario', 'Actividades', 'Producción', 'Alertas', 'Compras', 'Personal', 'Maquinaria', 'Gastos', 'Proveedores', 'Reportes']
  const objectiveOptions = ['Tener toda la información en un solo lugar', 'Detectar problemas rápido', 'Reducir pérdidas', 'Registrar actividades de campo', 'Automatizar reportes', 'Mejorar productividad', 'Evitar faltantes de inventario', 'Ahorrar tiempo administrativo']
  const challengeOptions = ['La información se pierde en WhatsApp', 'No tengo control de inventario', 'Mi personal no reporta a tiempo', 'No sé qué está pasando en campo', 'Capturar información toma demasiado tiempo', 'No tengo reportes claros', 'Hay demasiados procesos manuales', 'Otro']
  const steps = [
    {
      title: 'Datos del negocio',
      subtitle: 'Empecemos con lo básico para personalizar Compagro.',
      body: <div className="space-y-4"><Field label="Nombre del negocio" value={data.business.name} onChange={(v) => updateBusiness({ name: v })} placeholder="Ej. Rancho El Encino" /><Field label="Ubicación" value={data.business.location} onChange={(v) => updateBusiness({ location: v })} placeholder="Municipio, estado" /><Field label="Dimensión geográfica" value={data.business.size} onChange={(v) => updateBusiness({ size: v })} placeholder="Ej. 35 ha, 4 lotes, 2 ranchos" /><div><p className="mb-2 text-sm font-extrabold text-[#155C35]">Principal actividad</p><div className="grid grid-cols-2 gap-2 md:grid-cols-3">{activityOptions.map((o) => <Pill key={o} active={data.business.activity === o} onClick={() => updateBusiness({ activity: o, category: '', crop: '' })}>{o}</Pill>)}</div></div></div>
    },
    {
      title: 'Categoría específica',
      subtitle: 'Así ajustamos inventario, alertas y reportes a tu operación.',
      body: <div className="space-y-5"><div className="grid grid-cols-2 gap-2 md:grid-cols-3">{(categoryOptions[data.business.activity] || []).map((o) => <Pill key={o} active={data.business.category === o} onClick={() => updateBusiness({ category: o, crop: '' })}>{o}</Pill>)}</div>{cropOptions[data.business.category] && <div><p className="mb-2 text-sm font-extrabold text-[#155C35]">Tipo principal</p><div className="grid grid-cols-2 gap-2 md:grid-cols-3">{cropOptions[data.business.category].map((o) => <Pill key={o} active={data.business.crop === o} onClick={() => updateBusiness({ crop: o })}>{o}</Pill>)}</div></div>}</div>
    },
    {
      title: '¿Qué quieres controlar?',
      subtitle: 'Esto nos ayuda a entender qué módulos usar más.',
      body: <div className="grid grid-cols-2 gap-2 md:grid-cols-3">{controlOptions.map((o) => <Pill key={o} active={(data.business.controls || []).includes(o)} onClick={() => toggleBusinessArray('controls', o)}>{o}</Pill>)}</div>
    },
    {
      title: 'Objetivos',
      subtitle: 'Compagro priorizará la información según tus metas.',
      body: <div className="grid gap-2 md:grid-cols-2">{objectiveOptions.map((o) => <Pill key={o} active={(data.business.objectives || []).includes(o)} onClick={() => toggleBusinessArray('objectives', o)}>{o}</Pill>)}</div>
    },
    {
      title: 'Operación actual',
      subtitle: 'Estos datos sirven para personalizar el panel según cada operación.',
      body: <div className="space-y-5"><div><p className="mb-2 text-sm font-extrabold text-[#155C35]">¿Cuántas personas participan?</p><div className="grid grid-cols-2 gap-2 md:grid-cols-3">{['Solo yo', '2-5 personas', '6-20 personas', '21-50 personas', 'Más de 50'].map((o) => <Pill key={o} active={data.business.people === o} onClick={() => updateBusiness({ people: o })}>{o}</Pill>)}</div></div><div><p className="mb-2 text-sm font-extrabold text-[#155C35]">¿Cómo registran actividades?</p><div className="grid grid-cols-2 gap-2 md:grid-cols-3">{['Papel y libreta', 'WhatsApp', 'Excel', 'Software especializado', 'No llevamos registros'].map((o) => <Pill key={o} active={data.business.currentLog === o} onClick={() => updateBusiness({ currentLog: o })}>{o}</Pill>)}</div></div><div><p className="mb-2 text-sm font-extrabold text-[#155C35]">Retos actuales</p><div className="grid gap-2 md:grid-cols-2">{challengeOptions.map((o) => <Pill key={o} active={(data.business.challenges || []).includes(o)} onClick={() => toggleBusinessArray('challenges', o)}>{o}</Pill>)}</div></div></div>
    },
  ]
  const progress = ((step + 1) / steps.length) * 100
  return (
    <main className="min-h-screen bg-[#F8F1E3] p-4 font-[Inter,ui-sans-serif,system-ui] text-[#14251B] md:p-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3"><Logo className="h-14 w-14" /><div><h1 className="text-3xl font-black tracking-tight text-[#155C35]">Compagro</h1><p className="font-semibold text-[#14251B]/70">Tu compa operativo con IA</p></div></div>
          <button onClick={goBack} className="rounded-2xl border border-[#E8DDC9] bg-white px-4 py-3 text-sm font-black text-[#155C35]">Volver</button>
        </header>
        <Card className="overflow-hidden p-5 md:p-8">
          <div className="mb-6 flex items-center justify-between gap-3"><div><p className="text-sm font-black text-[#155C35]/70">Paso {step + 1} de {steps.length}</p><h2 className="text-2xl font-black tracking-tight md:text-4xl">{steps[step].title}</h2><p className="mt-1 text-sm font-medium text-[#14251B]/55">{steps[step].subtitle}</p></div><span className="rounded-full bg-[#EAF7E7] px-4 py-2 text-sm font-black text-[#155C35]">{Math.round(progress)}%</span></div>
          <div className="mb-7 h-3 overflow-hidden rounded-full bg-[#E8DDC9]"><div className="h-full rounded-full bg-[#155C35] transition-all duration-500" style={{ width: `${progress}%` }} /></div>
          {steps[step].body}
          <div className="mt-8 flex gap-3"><button disabled={step === 0} onClick={() => setStep((c) => Math.max(0, c - 1))} className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#E8DDC9] bg-white px-5 py-4 font-black text-[#155C35] disabled:opacity-40"><ArrowLeft size={18} />Regresar</button><button onClick={() => step === steps.length - 1 ? finishOnboarding() : setStep((c) => c + 1)} className="flex flex-[1.4] items-center justify-center gap-2 rounded-2xl bg-[#155C35] px-5 py-4 font-black text-white shadow-sm">{step === steps.length - 1 ? 'Entrar al panel' : 'Continuar'}<ChevronRight size={18} /></button></div>
        </Card>
      </div>
    </main>
  )
}

export default function Compagro() {
  const [data, setData] = useState(loadState)
  const [authScreen, setAuthScreen] = useState(() => loadState().onboardingDone ? 'app' : 'landing')
  const [step, setStep] = useState(0)
  const [view, setView] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [manualItem, setManualItem] = useState({ name: '', quantity: '', unit: 'kg', category: 'Otro' })

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) }, [data])

  const updateBusiness = (patch) => setData((prev) => ({ ...prev, business: { ...prev.business, ...patch } }))
  const toggleBusinessArray = (key, value) => setData((prev) => {
    const current = prev.business[key] || []
    return { ...prev, business: { ...prev.business, [key]: current.includes(value) ? current.filter((item) => item !== value) : [...current, value] } }
  })
  const startRegister = () => { setData(initialState); setStep(0); setView('home'); setAuthScreen('onboarding') }
  const startLogin = () => {
    const saved = loadState()
    if (saved?.onboardingDone) { setData(saved); setView('home'); setAuthScreen('app') }
    else { alert('Todavía no hay una operación registrada en este navegador. Primero registra tu operación.'); startRegister() }
  }
  const finishOnboarding = () => {
    const finishedData = { ...data, onboardingDone: true }
    setData(finishedData)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(finishedData))
    setView('home')
    setAuthScreen('app')
  }

  // Hooks deben ejecutarse siempre antes de cualquier return condicional.
  // Si quedan después de landing/onboarding, React puede mostrar pantalla blanca al entrar al panel.
  const activeAlerts = useMemo(() => data.alerts.filter((a) => !a.resolved), [data.alerts])
  const criticalAlerts = activeAlerts.filter((a) => a.level === 'Crítico').length
  const seedCriticalCount = data.inventory.filter((i) => i.category === 'Semillas' && i.status === 'Crítico').length

  if (authScreen === 'landing') return <Landing onRegister={startRegister} onLogin={startLogin} />
  if (authScreen === 'onboarding') return <Onboarding data={data} updateBusiness={updateBusiness} toggleBusinessArray={toggleBusinessArray} step={step} setStep={setStep} finishOnboarding={finishOnboarding} goBack={() => setAuthScreen('landing')} />

  const addActivity = (activity) => setData((prev) => ({ ...prev, activities: [{ id: uid('act'), time: 'Ahora', ...activity }, ...prev.activities].slice(0, 40) }))
  const addAlert = (title, detail, level = 'Atención') => setData((prev) => ({ ...prev, alerts: [{ id: uid('alert'), title, detail, level, resolved: false }, ...prev.alerts] }))

  const simulateMessage = () => {
    const text = message.trim(); if (!text) return
    const lower = text.toLowerCase()
    setData((prev) => ({ ...prev, bot: { ...prev.bot, lastMessage: text } }))
    addActivity({ type: 'whatsapp', title: 'Mensaje capturado', detail: text })
    if (lower.includes('plaga')) addAlert('Posible plaga reportada', text, 'Crítico')
    if (lower.includes('terminó') || lower.includes('termino') || lower.includes('bajo')) addAlert('Faltante detectado', text, 'Crítico')
    if (lower.includes('llegaron') || lower.includes('entraron') || lower.includes('agregaron')) {
      addActivity({ type: 'box', title: 'Entrada detectada por IA', detail: 'Pendiente de validar en inventario' })
    }
    setMessage('')
  }

  const addManualInventory = () => {
    if (!manualItem.name || !manualItem.quantity) return
    const item = { ...manualItem, id: uid('inv'), quantity: Number(manualItem.quantity), status: statusFor(manualItem.quantity, manualItem.unit), lastMove: 'Agregado manualmente' }
    setData((prev) => ({ ...prev, inventory: [item, ...prev.inventory] }))
    addActivity({ type: 'box', title: `Inventario agregado: ${item.name}`, detail: `${item.quantity} ${item.unit}` })
    setManualItem({ name: '', quantity: '', unit: 'kg', category: 'Otro' })
  }

  const content = {
    home: <HomeView data={data} activeAlerts={activeAlerts} criticalAlerts={criticalAlerts} seedCriticalCount={seedCriticalCount} setView={setView} />,
    activity: <ActivityView message={message} setMessage={setMessage} onSave={simulateMessage} activities={data.activities} />,
    inventory: <InventoryView inventory={data.inventory} manualItem={manualItem} setManualItem={setManualItem} addManualInventory={addManualInventory} setData={setData} addActivity={addActivity} />,
    alerts: <AlertsView alerts={data.alerts} setData={setData} />,
    bot: <BotView data={data} setData={setData} message={message} setMessage={setMessage} simulateMessage={simulateMessage} />,
    purchases: <PurchasesView data={data} setView={setView} />,
    providers: <ProvidersView providers={data.providers || []} />,
    staff: <StaffView staff={data.staff || []} />,
    reports: <ReportsView data={data} setData={setData} />,
    settings: <SettingsView resetState={resetState} />,
  }[view]

  return (
    <div className="min-h-screen bg-[#F8F1E3] font-[Inter,ui-sans-serif,system-ui] text-[#14251B]">
      <div className="mx-auto flex max-w-7xl">
        <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 -translate-x-full flex-col border-r border-[#E8DDC9] bg-[#FFFCF5] p-4 transition md:sticky md:top-0 md:h-screen md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : ''}`}>
          <button type="button" onClick={() => { setView('home'); setSidebarOpen(false) }} className="mb-6 flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left transition hover:bg-[#EAF7E7]">
            <Logo className="h-12 w-12" />
            <div><h1 className="text-2xl font-black text-[#155C35]">Compagro</h1><p className="text-xs font-bold text-[#14251B]/50">Operación agrícola con IA</p></div>
          </button>
          <nav className="min-h-0 flex-1 space-y-2 overflow-y-auto pb-4 pr-1">
            {views.map((item) => { const Icon = item.icon; return <button key={item.key} onClick={() => { setView(item.key); setSidebarOpen(false) }} className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left font-black transition ${view === item.key ? 'bg-[#155C35] text-white' : 'text-[#14251B]/70 hover:bg-[#EAF7E7] hover:text-[#155C35]'}`}><Icon size={20} />{item.label}</button> })}
          </nav>
          <div className="mt-auto space-y-3 pt-4">
            <button onClick={resetState} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D9534F] px-4 py-3 text-sm font-black text-white">
              <LogOut size={16} /> Cerrar sesión / reiniciar
            </button>
            <div className="rounded-2xl bg-[#EEF9E9] p-4 text-sm text-[#155C35]">
              <p className="font-black">Compagro activo</p>
              <p className="mt-1 text-xs text-[#155C35]/70">Panel operativo listo para capturar información de campo.</p>
            </div>
          </div>
        </aside>
        {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-30 bg-black/30 md:hidden" />}
        <main className="min-w-0 flex-1 p-4 md:p-8">
          <header className="mb-6 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="grid h-11 w-11 place-items-center rounded-2xl bg-white md:hidden"><Menu /></button>
              <button type="button" onClick={() => setView('home')} className="hidden items-center gap-3 rounded-2xl px-1 py-1 text-left transition hover:bg-[#EAF7E7] md:flex" aria-label="Ir al inicio">
                <Logo className="h-12 w-12" />
                <div className="min-w-0">
                  <p className="text-sm font-black uppercase tracking-[.28em] text-[#155C35]/70">Compagro</p>
                  <p className="truncate text-sm font-black text-[#14251B]/70">Operación agrícola con IA</p>
                </div>
              </button>
            </div>
            <div className="flex items-center gap-2">
              {view !== 'home' && <button onClick={() => setView('home')} className="rounded-2xl border border-[#E8DDC9] bg-white px-3 py-3 text-sm font-black text-[#155C35]"><Home size={16} className="mr-1 inline" />Inicio</button>}
              <button onClick={resetState} className="rounded-2xl border border-[#F0C8C5] bg-white px-3 py-3 text-sm font-black text-[#D9534F] md:px-4"><LogOut size={16} className="mr-1 inline" /><span className="hidden sm:inline">Cerrar sesión</span><span className="sm:hidden">Salir</span></button>
            </div>
          </header>
          {view !== 'home' && <button onClick={() => setView('home')} className="mb-5 inline-flex items-center gap-2 rounded-2xl border border-[#E8DDC9] bg-white px-4 py-3 text-sm font-black text-[#155C35] md:hidden"><ArrowLeft size={16} />Regresar al inicio</button>}
          {content}
          <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-5 border-t border-[#E8DDC9] bg-[#FFFCF5] px-1 py-2 shadow-[0_-8px_24px_rgba(31,92,59,0.08)] md:hidden">
            {[views[0], views[1], views[2], views[3], views[4]].map((item) => { const Icon = item.icon; return <button key={item.key} onClick={() => { setView(item.key); setSidebarOpen(false) }} className={`flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-black ${view === item.key ? 'bg-[#EAF7E7] text-[#155C35]' : 'text-[#14251B]/55'}`}><Icon size={19} />{item.label.split(' ')[0]}</button> })}
          </nav>
        </main>
      </div>
    </div>
  )
}

function HomeView({ data, activeAlerts, criticalAlerts, seedCriticalCount, setView }) {
  const businessName = data.business?.name?.trim() || 'Nombre de tu negocio'
  const statusText = criticalAlerts > 0 ? 'Atención' : 'Activo'
  const statusTone = 'text-[#155C35]'
  return <div className="space-y-6 pb-20 md:pb-0">
    <section className="flex justify-end">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 rounded-[22px] border border-[#E8DDC9] bg-white px-4 py-3 shadow-sm">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#EAF7E7]"><span className={`h-5 w-5 rounded-full bg-[#65D05F]`} /></span>
          <div>
            <p className="text-xs font-black text-[#14251B]/45">Estado general</p>
            <p className={`text-lg font-black ${statusTone}`}>{statusText}</p>
          </div>
        </div>
        <button onClick={() => setView('alerts')} className="relative grid h-16 w-16 place-items-center rounded-[22px] border border-[#E8DDC9] bg-white shadow-sm">
          <Bell size={26} />
          {activeAlerts.length > 0 && <span className="absolute -right-1 -top-1 grid h-8 w-8 place-items-center rounded-full bg-[#EF4444] text-sm font-black text-white">{activeAlerts.length}</span>}
        </button>
      </div>
    </section>

    <section className="relative overflow-hidden rounded-[32px] bg-[#155C35] px-7 py-8 text-white shadow-[0_20px_60px_rgba(21,92,53,0.18)] md:px-10 md:py-12">
      <div className="relative flex items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight md:text-6xl">{businessName}</h2>
          <p className="mt-4 text-lg font-bold text-white/85 md:text-2xl">Buen día, ¿en qué te ayudo hoy?</p>
        </div>
        <button type="button" onClick={() => setView('home')} className="hidden transition hover:scale-105 md:block" aria-label="Ir al inicio">
          <Logo className="h-36 w-36" />
        </button>
      </div>
    </section>

    <section>
      <h3 className="mb-4 text-2xl font-black">Acciones rápidas</h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <QuickAction icon={<ClipboardEdit size={36} />} label="Registrar actividad" onClick={() => setView('activity')} />
        <QuickAction icon={<ReceiptText size={36} />} label="Subir ticket o factura" onClick={() => setView('activity')} />
        <QuickAction icon={<Bell size={36} />} label="Ver alertas" badge={activeAlerts.length} amber onClick={() => setView('alerts')} />
        <QuickAction icon={<Package size={36} />} label="Inventario" onClick={() => setView('inventory')} />
        <QuickAction icon={<Bot size={36} />} label="Conectar bot" onClick={() => setView('bot')} />
      </div>
    </section>

    <section>
      <h3 className="mb-4 text-2xl font-black">Resumen general</h3>
      <div className="grid gap-4 md:grid-cols-3">
        <Kpi title="Inventario" value={data.inventory.length} icon={<Package />} tone="green" onClick={() => setView('inventory')} />
        <Kpi title="Actividades recientes" value={data.activities.length} icon={<Leaf />} tone="green" onClick={() => setView('activity')} />
        <Kpi title="Alertas activas" value={activeAlerts.length} icon={<Bell />} tone={criticalAlerts > 0 ? 'amber' : 'green'} onClick={() => setView('alerts')} />
      </div>
    </section>

    <section className="grid gap-5 lg:grid-cols-2">
      <div>
        <div className="mb-3 flex items-center justify-between"><h3 className="text-xl font-black">Alertas importantes</h3><button onClick={() => setView('alerts')} className="text-sm font-black text-[#155C35]">Ver todas →</button></div>
        <div className="space-y-3">{activeAlerts.slice(0, 3).map((a) => <AlertRow key={a.id} alert={a} />)}</div>
      </div>
      <div>
        <div className="mb-3 flex items-center justify-between"><h3 className="text-xl font-black">Mensajes y actualizaciones</h3><button onClick={() => setView('activity')} className="text-sm font-black text-[#155C35]">Agregar →</button></div>
        <Card className="divide-y divide-[#EEE5D5] overflow-hidden p-0">{data.activities.slice(0, 5).map((a) => <ActivityRow key={a.id} activity={a} />)}</Card>
      </div>
    </section>
  </div>
}
function Kpi({ title, value, icon, tone, onClick }) { return <button onClick={onClick} className="rounded-[26px] border border-[#E8DDC9] bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5"><IconCircle tone={tone} className="mb-4 h-12 w-12">{icon}</IconCircle><p className="text-3xl font-black">{value}</p><p className="text-sm font-bold text-[#14251B]/55">{title}</p></button> }
function QuickAction({ icon, label, onClick, badge, amber }) { return <button onClick={onClick} className={`relative min-h-[126px] rounded-[24px] border p-4 text-center font-black shadow-sm transition hover:-translate-y-0.5 active:scale-[.98] ${amber ? 'border-[#F2D89B] bg-[#FFF7DF] text-[#B87500]' : 'border-[#CFE7C2] bg-[#EEF9E9] text-[#155C35]'}`}>{badge > 0 && <span className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-[#EF4444] text-sm text-white">{badge}</span>}<div className={`mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl ${amber ? 'text-[#E9A23B]' : 'text-[#11733F]'}`}>{icon}</div><span className="block text-sm leading-tight">{label}</span></button> }
function AlertRow({ alert }) { return <div className={`flex items-start gap-4 rounded-[22px] border p-4 ${alert.level === 'Crítico' ? 'border-[#F0C8C5] bg-[#FFF8F7]' : 'border-[#F2D89B] bg-[#FFFBF0]'}`}><IconCircle tone={alert.level === 'Crítico' ? 'red' : 'amber'} className="h-12 w-12 shrink-0"><AlertTriangle size={22} /></IconCircle><div className="flex-1"><p className="font-black">{alert.title}</p><p className="mt-1 text-sm text-[#14251B]/60">{alert.detail}</p></div><span className={`rounded-full px-3 py-1 text-xs font-black ${alert.level === 'Crítico' ? 'bg-[#FFE7E6] text-[#D9534F]' : 'bg-[#FFF5D9] text-[#B87500]'}`}>{alert.level}</span></div> }
function ActivityRow({ activity }) { const map = { whatsapp: ['green', <Wifi size={20} />], box: ['green', <Box size={20} />], n8n: ['purple', <RefreshCw size={20} />], alert: ['amber', <AlertTriangle size={20} />], check: ['green', <Check size={20} />] }; const [tone, icon] = map[activity.type] || ['green', <Leaf size={20} />]; return <div className="flex items-center gap-4 px-5 py-4"><IconCircle tone={tone} className="h-11 w-11 shrink-0">{icon}</IconCircle><div className="min-w-0 flex-1"><p className="font-black text-sm">{activity.title}</p><p className="truncate text-xs text-[#14251B]/65">{activity.detail}</p></div><p className="hidden shrink-0 text-xs text-[#14251B]/50 sm:block">{activity.time}</p></div> }

function ActivityView({ message, setMessage, onSave, activities }) { return <div className="space-y-5"><Card className="p-5"><h2 className="text-3xl font-black">Registrar actividad</h2><p className="mt-1 text-[#14251B]/60">Escribe como lo haría una persona de campo. Compagro lo interpreta como registro operativo.</p><textarea value={message} onChange={(e) => setMessage(e.target.value)} className="mt-4 min-h-36 w-full rounded-2xl border border-[#E8DDC9] p-4 outline-none focus:border-[#155C35]" placeholder="Ej. Se aplicaron 20 litros de fertilizante al lote 3" /><button onClick={onSave} className="mt-3 flex items-center gap-2 rounded-2xl bg-[#155C35] px-6 py-4 font-black text-white"><Send size={18} />Guardar actividad</button></Card><Card className="divide-y divide-[#EEE5D5] overflow-hidden p-0">{activities.map((a) => <ActivityRow key={a.id} activity={a} />)}</Card></div> }

function InventoryView({ inventory, manualItem, setManualItem, addManualInventory, setData, addActivity }) {
  const [filter, setFilter] = useState('Todos')
  const [subFilter, setSubFilter] = useState('Todos')
  const [search, setSearch] = useState('')
  const categories = ['Todos', ...new Set(inventory.map((i) => i.category))]
  const subcats = filter === 'Semillas' ? ['Todos', ...new Set(inventory.filter((i) => i.category === 'Semillas').map((i) => i.subcategory).filter(Boolean))] : []
  const filtered = inventory.filter((i) => (filter === 'Todos' || i.category === filter) && (subFilter === 'Todos' || i.subcategory === subFilter) && (!search || i.name.toLowerCase().includes(search.toLowerCase())))
  const recordExit = (item) => {
    const amount = Number(window.prompt(`¿Cuánto salió de ${item.name}?`, '1') || 0); if (!amount) return
    setData((prev) => ({ ...prev, inventory: prev.inventory.map((p) => p.id === item.id ? { ...p, quantity: Math.max(0, Number(p.quantity) - amount), status: statusFor(Math.max(0, Number(p.quantity) - amount), p.unit), lastMove: `Salida: -${amount} ${p.unit}` } : p) }))
    addActivity({ type: 'box', title: `Salida registrada: ${item.name}`, detail: `-${amount} ${item.unit}` })
  }
  return <div className="space-y-5">
    <div className="grid grid-cols-3 gap-3"><SummaryBox label="Total" value={inventory.length} /><SummaryBox label="Críticos" value={inventory.filter(i => i.status === 'Crítico').length} red /><SummaryBox label="Bajos" value={inventory.filter(i => i.status === 'Bajo').length} amber /></div>
    <Card className="p-5"><h2 className="text-2xl font-black mb-4">Inventario</h2><div className="grid gap-3 md:grid-cols-6"><input value={manualItem.name} onChange={e => setManualItem({ ...manualItem, name: e.target.value })} placeholder="Nombre del producto" className="rounded-2xl border border-[#E8DDC9] px-4 py-3 outline-none md:col-span-2" /><input type="number" value={manualItem.quantity} onChange={e => setManualItem({ ...manualItem, quantity: e.target.value })} placeholder="Cantidad" className="rounded-2xl border border-[#E8DDC9] px-4 py-3 outline-none" /><input value={manualItem.unit} onChange={e => setManualItem({ ...manualItem, unit: e.target.value })} placeholder="Unidad" className="rounded-2xl border border-[#E8DDC9] px-4 py-3 outline-none" /><select value={manualItem.category} onChange={e => setManualItem({ ...manualItem, category: e.target.value })} className="rounded-2xl border border-[#E8DDC9] px-4 py-3 outline-none">{inventoryCategories.filter(c => c !== 'Todos').map(c => <option key={c}>{c}</option>)}</select><button onClick={addManualInventory} className="rounded-2xl bg-[#155C35] px-4 py-3 font-black text-white">Agregar</button></div></Card>
    <div className="space-y-2"><div className="flex gap-2 overflow-x-auto pb-1">{categories.map((c) => <button key={c} onClick={() => { setFilter(c); setSubFilter('Todos') }} className={`shrink-0 rounded-full px-4 py-2 text-sm font-black ${filter === c ? 'bg-[#155C35] text-white' : 'border border-[#E8DDC9] bg-white text-[#14251B]'}`}>{c}</button>)}</div>{subcats.length > 1 && <div className="flex gap-2 overflow-x-auto pb-1">{subcats.map((s) => <button key={s} onClick={() => setSubFilter(s)} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-black ${subFilter === s ? 'bg-[#A7D7B5] text-[#155C35]' : 'border border-[#E8DDC9] bg-white text-[#14251B]/70'}`}>{s}</button>)}</div>}<div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#14251B]/30" size={18} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar semillas o insumos..." className="w-full rounded-2xl border border-[#E8DDC9] py-3 pl-11 pr-4 outline-none focus:border-[#155C35]" /></div></div>
    <p className="text-sm font-bold text-[#14251B]/50">{filtered.length} resultados</p>
    <div className="grid gap-4 md:grid-cols-2">{filtered.map((item) => <InventoryItem key={item.id} item={item} onExit={() => recordExit(item)} onDelete={() => setData((prev) => ({ ...prev, inventory: prev.inventory.filter((p) => p.id !== item.id) }))} />)}</div>
  </div>
}
function SummaryBox({ label, value, red, amber }) { return <div className={`rounded-[22px] border p-4 text-center ${red ? 'border-[#F0C8C5] bg-[#FFF8F7] text-[#D9534F]' : amber ? 'border-[#F2D89B] bg-[#FFFBF0] text-[#B87500]' : 'border-[#E8DDC9] bg-white text-[#155C35]'}`}><p className="text-2xl font-black">{value}</p><p className="text-xs font-bold opacity-70">{label}</p></div> }
function InventoryItem({ item, onExit, onDelete }) { const tone = item.status === 'Crítico' ? 'red' : item.status === 'Bajo' ? 'amber' : 'green'; return <Card className="p-5"><div className="flex items-start justify-between gap-3"><div className="flex gap-3"><IconCircle tone={tone} className="h-12 w-12"><Package size={20} /></IconCircle><div><h3 className="font-black leading-tight">{item.name}</h3><p className="text-xs text-[#14251B]/50">{item.subcategory ? `${item.category} · ${item.subcategory}` : item.category}</p></div></div><StatusPill status={item.status} /></div><p className="mt-4 text-3xl font-black">{item.quantity} <span className="text-base text-[#14251B]/50">{item.unit}</span></p><p className="mt-1 text-xs text-[#14251B]/60">Último movimiento: {item.lastMove}</p><div className="mt-4 flex gap-2"><button onClick={onExit} className="flex-1 rounded-2xl bg-[#155C35] px-4 py-3 text-sm font-black text-white">Registrar salida</button><button onClick={onDelete} className="rounded-2xl border border-[#F0C8C5] px-4 py-3 text-sm text-[#D9534F]"><X size={16} /></button></div></Card> }

function AlertsView({ alerts, setData }) { return <div className="space-y-4"><h2 className="text-3xl font-black">Alertas</h2>{alerts.map((alert) => <Card key={alert.id} className={`p-5 ${alert.resolved ? 'opacity-60' : ''}`}><div className="flex items-start gap-4"><IconCircle tone={alert.resolved ? 'green' : alert.level === 'Crítico' ? 'red' : 'amber'} className="h-14 w-14 shrink-0">{alert.resolved ? <Check /> : <AlertTriangle />}</IconCircle><div className="flex-1"><div className="flex items-start justify-between gap-3"><h3 className="font-black">{alert.title}</h3><span className={`rounded-full px-3 py-1 text-xs font-black ${alert.resolved ? 'bg-[#EAF7E7] text-[#155C35]' : alert.level === 'Crítico' ? 'bg-[#FFE7E6] text-[#D9534F]' : 'bg-[#FFF5D9] text-[#B87500]'}`}>{alert.resolved ? 'Resuelto' : alert.level}</span></div><p className="mt-1 text-sm text-[#14251B]/60">{alert.detail}</p><button onClick={() => setData((prev) => ({ ...prev, alerts: prev.alerts.map((item) => item.id === alert.id ? { ...item, resolved: !item.resolved } : item) }))} className="mt-4 rounded-2xl border border-[#E8DDC9] bg-white px-4 py-2.5 text-sm font-black text-[#155C35]">{alert.resolved ? 'Reabrir' : 'Marcar resuelta'}</button></div></div></Card>)}</div> }

function BotView({ data, setData, message, setMessage, simulateMessage }) { const webhookUrl = 'https://TU-N8N.app/webhook/compagro-whatsapp'; return <div className="space-y-5"><Card className="p-6"><h2 className="text-3xl font-black">WhatsApp + n8n</h2><p className="mt-2 max-w-3xl text-[#14251B]/60">La idea final: el usuario escribe normal en WhatsApp, n8n interpreta el mensaje y Compagro lo convierte en actividad, inventario o alerta.</p><div className="mt-5 grid gap-3 md:grid-cols-2"><button onClick={() => setData((prev) => ({ ...prev, bot: { ...prev.bot, whatsapp: !prev.bot.whatsapp } }))} className={`rounded-2xl px-5 py-4 font-black ${data.bot.whatsapp ? 'bg-[#155C35] text-white' : 'border border-[#155C35] bg-white text-[#155C35]'}`}>{data.bot.whatsapp ? 'WhatsApp listo para pruebas' : 'Conectar WhatsApp'}</button><button onClick={() => setData((prev) => ({ ...prev, bot: { ...prev.bot, n8n: !prev.bot.n8n } }))} className={`rounded-2xl px-5 py-4 font-black ${data.bot.n8n ? 'bg-[#7C3AED] text-white' : 'border border-[#7C3AED] bg-white text-[#7C3AED]'}`}>{data.bot.n8n ? 'n8n conectado' : 'Marcar n8n conectado'}</button></div><div className="mt-4 rounded-2xl bg-[#F8F1E3] p-4"><p className="text-xs font-black text-[#155C35]/70">ÚLTIMO MENSAJE</p><p className="font-semibold">“{data.bot.lastMessage}”</p></div></Card><Card className="p-6"><h3 className="text-xl font-black">Payload sugerido para n8n</h3><pre className="mt-3 overflow-x-auto rounded-2xl bg-[#14251B] p-4 text-xs text-white">{`{
  "type": "inventory_update",
  "sender": "Juan",
  "message": "Llegaron 5 costales de maíz",
  "product": "Maíz",
  "quantity": 5,
  "unit": "costales",
  "lote": "Lote 3"
}`}</pre><p className="mt-3 text-sm text-[#14251B]/60">Para que se actualice para todos los usuarios, n8n deberá guardar en una base de datos o llamar una API con persistencia. En esta etapa la información se guarda localmente mientras se conecta la base de datos final.</p></Card><Card className="p-6"><h3 className="text-2xl font-black">Simular mensaje</h3><div className="mt-4 flex gap-2 rounded-2xl bg-[#F8F1E3] p-2"><input value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && simulateMessage()} placeholder="Ej. Llegaron 5 costales de maíz" className="min-w-0 flex-1 bg-transparent px-3 outline-none" /><button onClick={simulateMessage} className="grid h-12 w-12 place-items-center rounded-xl bg-[#155C35] text-white"><Send /></button></div><div className="mt-3 flex flex-wrap gap-2">{['Llegaron 5 costales de maíz', 'Se aplicaron 20 litros de urea al lote 3', 'Se terminó el insecticida', 'Detectamos plaga en el lote norte'].map((ex) => <button key={ex} onClick={() => setMessage(ex)} className="rounded-full bg-[#EAF7E7] px-3 py-2 text-xs font-black text-[#155C35]">{ex}</button>)}</div></Card></div> }


function PurchasesView({ data, setView }) {
  const compras = (data.sales?.records || []).filter((r) => r.type === 'egreso')
  return <div className="space-y-5 pb-20 md:pb-0"><div><h2 className="text-3xl font-black">Compras</h2><p className="mt-1 text-sm text-[#14251B]/60">Control de entradas, compras de insumos y relación con proveedores.</p></div><Card className="p-5"><h3 className="text-xl font-black">Entradas recientes</h3><div className="mt-4 space-y-3">{compras.map((c) => <div key={c.id} className="flex items-center gap-4 rounded-2xl border border-[#E8DDC9] bg-white p-4"><IconCircle tone="amber" className="h-11 w-11"><ShoppingCart size={18} /></IconCircle><div className="min-w-0 flex-1"><p className="font-black text-sm">{c.concept}</p><p className="text-xs text-[#14251B]/55">{c.client} · {c.date}</p></div><p className="font-black text-[#B87500]">${Number(c.amount).toLocaleString()}</p></div>)}</div></Card><button onClick={() => setView('providers')} className="rounded-2xl bg-[#155C35] px-5 py-4 font-black text-white">Ver proveedores</button></div>
}

function ProvidersView({ providers }) {
  return <div className="space-y-5 pb-20 md:pb-0"><div><h2 className="text-3xl font-black">Proveedores</h2><p className="mt-1 max-w-2xl text-sm text-[#14251B]/60">Este apartado servirá para saber de dónde vienen las entradas, comparar historial y detectar al proveedor más confiable por insumo.</p></div><div className="grid gap-4 md:grid-cols-2">{providers.map((p) => <Card key={p.id} className="p-5"><div className="flex items-start gap-4"><IconCircle tone="green" className="h-12 w-12"><Box size={20} /></IconCircle><div><h3 className="font-black">{p.name}</h3><p className="text-sm text-[#14251B]/60">{p.category}</p><p className="mt-3 text-sm"><span className="font-black text-[#155C35]">Última entrada:</span> {p.lastEntry}</p><p className="text-sm"><span className="font-black text-[#155C35]">Confianza:</span> {p.trust}</p></div></div></Card>)}</div></div>
}

function StaffView({ staff }) {
  return <div className="space-y-5 pb-20 md:pb-0"><div><h2 className="text-3xl font-black">Personal</h2><p className="mt-1 max-w-2xl text-sm text-[#14251B]/60">Aquí se podrá controlar quién manda mensajes por WhatsApp, qué reporta y qué tan activa está cada persona.</p></div><div className="grid gap-4 md:grid-cols-2">{staff.map((person) => <Card key={person.id} className="p-5"><div className="flex items-start gap-4"><IconCircle tone="blue" className="h-12 w-12"><Users size={20} /></IconCircle><div><h3 className="font-black">{person.name}</h3><p className="text-sm text-[#14251B]/60">{person.role} · {person.channel}</p><p className="mt-3 text-sm"><span className="font-black text-[#155C35]">Último reporte:</span> {person.lastMessage}</p></div></div></Card>)}</div></div>
}

function ReportsView({ data, setData }) {
  const [pinInput, setPinInput] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [adding, setAdding] = useState(false)
  const [newRecord, setNewRecord] = useState({ concept: '', amount: '', type: 'ingreso', client: '' })
  const records = data.sales.records || []
  const ingresos = records.filter(r => r.type === 'ingreso').reduce((s,r)=>s+Number(r.amount),0)
  const egresos = records.filter(r => r.type === 'egreso').reduce((s,r)=>s+Number(r.amount),0)
  const balance = ingresos - egresos
  const progress = Math.min(100, Math.round((ingresos / data.sales.monthlyTarget) * 100))
  const addRecord = () => { if (!newRecord.concept || !newRecord.amount) return; const record = { id: uid('v'), ...newRecord, amount: Number(newRecord.amount), date: new Date().toISOString().split('T')[0] }; setData(prev => ({ ...prev, sales: { ...prev.sales, records: [record, ...prev.sales.records] } })); setNewRecord({ concept: '', amount: '', type: 'ingreso', client: '' }); setAdding(false) }
  if (!unlocked) return <div className="flex min-h-[60vh] items-center justify-center"><Card className="w-full max-w-sm p-8 text-center"><IconCircle tone="purple" className="mx-auto mb-4 h-16 w-16"><Lock size={30} /></IconCircle><h2 className="text-2xl font-black">Reportes privados</h2><p className="mt-2 text-sm text-[#14251B]/60">Aquí irán los gráficos de avance, ingresos, compras y productividad sin saturar el panel principal.</p><input type="password" value={pinInput} onChange={e => setPinInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && pinInput === data.sales.pin && setUnlocked(true)} placeholder="PIN" className="mt-6 w-full rounded-2xl border border-[#E8DDC9] px-4 py-4 text-center outline-none" /><button onClick={() => pinInput === data.sales.pin && setUnlocked(true)} className="mt-3 w-full rounded-2xl bg-[#7C3AED] px-5 py-4 font-black text-white">Acceder</button><p className="mt-3 text-xs text-[#14251B]/40">PIN de prueba: 1234</p></Card></div>
  return <div className="space-y-5"><div className="flex items-center justify-between"><h2 className="text-3xl font-black">Reportes</h2><button onClick={() => setUnlocked(false)} className="rounded-full border border-[#E8DDC9] bg-white p-2 text-[#14251B]/40"><EyeOff size={16} /></button></div><div className="grid grid-cols-3 gap-3"><FinanceBox label="Ingresos" value={ingresos} /><FinanceBox label="Egresos" value={egresos} red /><FinanceBox label="Balance" value={balance} amber={balance<0} /></div><Card className="p-5"><div className="mb-3 flex items-center justify-between"><span className="font-black">Meta mensual</span><span className="font-black text-[#155C35]">{progress}%</span></div><div className="h-3 overflow-hidden rounded-full bg-[#E8DDC9]"><div className="h-full rounded-full bg-[#155C35]" style={{ width: `${progress}%` }} /></div><p className="mt-2 text-sm text-[#14251B]/60">${ingresos.toLocaleString()} de ${data.sales.monthlyTarget.toLocaleString()}</p></Card>{adding ? <Card className="p-5"><h3 className="mb-4 font-black">Nuevo registro</h3><div className="space-y-3"><input value={newRecord.concept} onChange={e=>setNewRecord({...newRecord, concept:e.target.value})} placeholder="Concepto" className="w-full rounded-2xl border border-[#E8DDC9] px-4 py-3 outline-none" /><div className="grid grid-cols-2 gap-3"><input type="number" value={newRecord.amount} onChange={e=>setNewRecord({...newRecord, amount:e.target.value})} placeholder="Monto" className="rounded-2xl border border-[#E8DDC9] px-4 py-3 outline-none" /><select value={newRecord.type} onChange={e=>setNewRecord({...newRecord, type:e.target.value})} className="rounded-2xl border border-[#E8DDC9] px-4 py-3 outline-none"><option value="ingreso">Ingreso</option><option value="egreso">Egreso</option></select></div><input value={newRecord.client} onChange={e=>setNewRecord({...newRecord, client:e.target.value})} placeholder="Cliente/proveedor" className="w-full rounded-2xl border border-[#E8DDC9] px-4 py-3 outline-none" /><div className="flex gap-3"><button onClick={addRecord} className="flex-1 rounded-2xl bg-[#7C3AED] px-4 py-3 font-black text-white">Guardar</button><button onClick={()=>setAdding(false)} className="rounded-2xl border border-[#E8DDC9] px-4 py-3 font-black">Cancelar</button></div></div></Card> : <button onClick={()=>setAdding(true)} className="w-full rounded-[22px] border-2 border-dashed border-[#E8DDC9] bg-white py-4 font-black text-[#14251B]/50">+ Registrar venta o gasto</button>}<div className="space-y-3">{records.map(r => <div key={r.id} className={`flex items-center gap-4 rounded-[22px] border p-4 ${r.type === 'ingreso' ? 'border-[#CFE7C2] bg-[#F4FBF2]' : 'border-[#F0C8C5] bg-[#FFF8F7]'}`}><IconCircle tone={r.type === 'ingreso' ? 'green' : 'red'} className="h-11 w-11 shrink-0">{r.type === 'ingreso' ? <TrendingUp size={18} /> : <ShoppingCart size={18} />}</IconCircle><div className="min-w-0 flex-1"><p className="font-black text-sm">{r.concept}</p><p className="text-xs text-[#14251B]/55">{r.client} · {r.date}</p></div><p className={`font-black ${r.type === 'ingreso' ? 'text-[#155C35]' : 'text-[#D9534F]'}`}>{r.type === 'ingreso' ? '+' : '-'}${Number(r.amount).toLocaleString()}</p></div>)}</div></div>
}
function FinanceBox({ label, value, red, amber }) { return <div className={`rounded-[22px] border p-4 ${red ? 'border-[#F0C8C5] bg-[#FFF8F7] text-[#D9534F]' : amber ? 'border-[#F2D89B] bg-[#FFFBF0] text-[#B87500]' : 'border-[#CFE7C2] bg-[#EAF7E7] text-[#155C35]'}`}><p className="text-xs font-black opacity-70">{label}</p><p className="text-xl font-black">${Number(value).toLocaleString()}</p></div> }

function SettingsView({ resetState }) { return <Card className="p-8"><h2 className="text-3xl font-black">Ajustes</h2><p className="mt-2 max-w-xl text-[#14251B]/60">Administra la información local de esta instalación. Puedes reiniciar el registro para configurar otro negocio.</p><button onClick={resetState} className="mt-5 rounded-2xl bg-[#D9534F] px-5 py-4 font-black text-white">Reiniciar datos locales</button></Card> }
