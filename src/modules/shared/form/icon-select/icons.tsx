import {
  AirportPlaneIcon,
  AmbulanceIcon,
  BallIcon,
  BankIcon,
  BeachIcon,
  BeerPitchIcon,
  BicycleBikeIcon,
  BoneIcon,
  BugIcon,
  BuildingIcon,
  CameraIcon,
  CashIcon,
  CatIcon,
  CheckIcon,
  ChessKnightIcon,
  ChristianCrossIcon,
  ClassLessonIcon,
  CocktailIcon,
  CoffeeMugIcon,
  CoinShareIcon,
  ControllerIcon,
  CreditCardIcon,
  DashboardIcon,
  DiamondIcon,
  DiscountPercentBadgeIcon,
  FavoriteGiveHeartIcon,
  FilesIcon,
  FlashIcon,
  FlowerIcon,
  ForkKnifeIcon,
  GameboyIcon,
  GiftIcon,
  GraduationCapIcon,
  HeartRatePulseGraphIcon,
  HeartsSymbolIcon,
  HexagramIcon,
  JusticeScaleIcon,
  LeafIcon,
  LipstickIcon,
  LocationPinIcon,
  MedicalBagIcon,
  ModulePuzzleIcon,
  MoneyCashBagIcon,
  MoneyCashBillIcon,
  MoonIcon,
  MouseIcon,
  MusicNoteIcon,
  OctopusIcon,
  PacmanIcon,
  ParliamentIcon,
  PartyPopperIcon,
  PeaceSymbolIcon,
  PhoneMobileIcon,
  PhoneIcon,
  PieChartIcon,
  PiggyBankIcon,
  RadioIcon,
  RainbowIcon,
  ReceiptIcon,
  SailShipIcon,
  ScreenIcon,
  ShoppingBasketIcon,
  ShoppingCartIcon,
  StartupIcon,
  StoreIcon,
  SubscriptionCashflowIcon,
  SunIcon,
  TagIcon,
  TransferVanIcon,
  TrashIcon,
  UserIcon,
  WheelchairIcon,
} from '@/m/shared/icons';

import { SelectOption } from '../../models';

export type IconOption = SelectOption & {
  icon: typeof AirportPlaneIcon;
};

export const ICON_OPTIONS: IconOption[] = [
  { label: 'Aeropuerto', value: 'AirportPlane', icon: AirportPlaneIcon },
  { label: 'Ambulancia', value: 'Ambulance', icon: AmbulanceIcon },
  { label: 'Pelota', value: 'Ball', icon: BallIcon },
  { label: 'Banco', value: 'Bank', icon: BankIcon },
  { label: 'Playa', value: 'Beach', icon: BeachIcon },
  { label: 'Jarra de cerveza', value: 'BeerPitch', icon: BeerPitchIcon },
  { label: 'Bicicleta', value: 'BicycleBike', icon: BicycleBikeIcon },
  { label: 'Hueso', value: 'Bone', icon: BoneIcon },
  { label: 'Bicho', value: 'Bug', icon: BugIcon },
  { label: 'Edificio', value: 'Building', icon: BuildingIcon },
  { label: 'Cámara', value: 'Camera', icon: CameraIcon },
  { label: 'Efectivo', value: 'Cash', icon: CashIcon },
  { label: 'Gato', value: 'Cat', icon: CatIcon },
  { label: 'Cheque', value: 'Check', icon: CheckIcon },
  { label: 'Caballo ajedrez', value: 'ChessKnight', icon: ChessKnightIcon },
  { label: 'Cruz cristiana', value: 'ChristianCross', icon: ChristianCrossIcon },
  { label: 'Clase', value: 'ClassLesson', icon: ClassLessonIcon },
  { label: 'Coctel', value: 'Cocktail', icon: CocktailIcon },
  { label: 'Taza de café', value: 'CoffeeMug', icon: CoffeeMugIcon },
  { label: 'Compartir moneda', value: 'CoinShare', icon: CoinShareIcon },
  { label: 'Controlador', value: 'Controller', icon: ControllerIcon },
  { label: 'Tarjeta de crédito', value: 'CreditCard', icon: CreditCardIcon },
  { label: 'Tablero de instrumentos', value: 'Dashboard', icon: DashboardIcon },
  { label: 'Diamante', value: 'Diamond', icon: DiamondIcon },
  { label: 'Descuento', value: 'DiscountPercentBadge', icon: DiscountPercentBadgeIcon },
  { label: 'Corazón regalo', value: 'FavoriteGiveHeart', icon: FavoriteGiveHeartIcon },
  { label: 'Archivos', value: 'Files', icon: FilesIcon },
  { label: 'Destello', value: 'Flash', icon: FlashIcon },
  { label: 'Flor', value: 'Flower', icon: FlowerIcon },
  { label: 'Cuchillo y tenedor', value: 'ForkKnife', icon: ForkKnifeIcon },
  { label: 'Gameboy', value: 'Gameboy', icon: GameboyIcon },
  { label: 'Regalo', value: 'Gift', icon: GiftIcon },
  { label: 'Gorra de graduación', value: 'GraduationCap', icon: GraduationCapIcon },
  {
    label: 'Gráfico de pulso cardíaco',
    value: 'HeartRatePulseGraph',
    icon: HeartRatePulseGraphIcon,
  },
  { label: 'Símbolo de corazones', value: 'HeartsSymbol', icon: HeartsSymbolIcon },
  { label: 'Hexagrama', value: 'Hexagram', icon: HexagramIcon },
  { label: 'Balanza de justicia', value: 'JusticeScale', icon: JusticeScaleIcon },
  { label: 'Hoja', value: 'Leaf', icon: LeafIcon },
  { label: 'Lápiz labial', value: 'Lipstick', icon: LipstickIcon },
  { label: 'Pin de ubicación', value: 'LocationPin', icon: LocationPinIcon },
  { label: 'Bolsa médica', value: 'MedicalBag', icon: MedicalBagIcon },
  { label: 'Rompecabezas de módulo', value: 'ModulePuzzle', icon: ModulePuzzleIcon },
  { label: 'Bolsa de dinero', value: 'MoneyCashBag', icon: MoneyCashBagIcon },
  { label: 'Billete de dinero', value: 'MoneyCashBill', icon: MoneyCashBillIcon },
  { label: 'Luna', value: 'Moon', icon: MoonIcon },
  { label: 'Ratón', value: 'Mouse', icon: MouseIcon },
  { label: 'Nota musical', value: 'MusicNote', icon: MusicNoteIcon },
  { label: 'Pulpo', value: 'Octopus', icon: OctopusIcon },
  { label: 'Pacman', value: 'Pacman', icon: PacmanIcon },
  { label: 'Parlamento', value: 'Parliament', icon: ParliamentIcon },
  { label: 'Lanzador de confeti', value: 'PartyPopper', icon: PartyPopperIcon },
  { label: 'Símbolo de paz', value: 'PeaceSymbol', icon: PeaceSymbolIcon },
  { label: 'Teléfono móvil', value: 'PhoneMobile', icon: PhoneMobileIcon },
  { label: 'Teléfono', value: 'Phone', icon: PhoneIcon },
  { label: 'Gráfico de pastel', value: 'PieChart', icon: PieChartIcon },
  { label: 'Hucha', value: 'PiggyBank', icon: PiggyBankIcon },
  { label: 'Radio', value: 'Radio', icon: RadioIcon },
  { label: 'Arco iris', value: 'Rainbow', icon: RainbowIcon },
  { label: 'Recibo', value: 'Receipt', icon: ReceiptIcon },
  { label: 'Barco de vela', value: 'SailShip', icon: SailShipIcon },
  { label: 'Pantalla', value: 'Screen', icon: ScreenIcon },
  { label: 'Cesta de la compra', value: 'ShoppingBasket', icon: ShoppingBasketIcon },
  { label: 'Carrito de compras', value: 'ShoppingCart', icon: ShoppingCartIcon },
  { label: 'Inicio', value: 'Startup', icon: StartupIcon },
  { label: 'Tienda', value: 'Store', icon: StoreIcon },
  {
    label: 'Flujo de caja de suscripción',
    value: 'SubscriptionCashflow',
    icon: SubscriptionCashflowIcon,
  },
  { label: 'Sol', value: 'Sun', icon: SunIcon },
  { label: 'Etiqueta', value: 'Tag', icon: TagIcon },
  { label: 'Furgoneta de transporte', value: 'TransferVan', icon: TransferVanIcon },
  { label: 'Papelera', value: 'Trash', icon: TrashIcon },
  { label: 'Usuario', value: 'User', icon: UserIcon },
  { label: 'Silla de ruedas', value: 'Wheelchair', icon: WheelchairIcon },
];

export const findIconByValue = (value: string) =>
  ICON_OPTIONS.find((option) => option.value === value)?.icon;
