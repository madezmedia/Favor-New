// Base logo URLs
const BASE_URLS = {
  ESPN: 'https://a.espncdn.com/i/teamlogos/nba/500',
  NBA: 'https://cdn.nba.com/logos/nba',
  RAPID: 'https://nba-api-free-data.p.rapidapi.com/team-logo',
} as const;

// Team logo mappings with multiple sources and custom overrides
export const TEAM_LOGOS: Record<string, {
  primary: string;
  alternate?: string;
  dark?: string;
  light?: string;
}> = {
  ATL: {
    primary: `${BASE_URLS.ESPN}/atl.png`,
    dark: `${BASE_URLS.NBA}/hawks/primary/L/logo.svg`,
  },
  BOS: {
    primary: `${BASE_URLS.ESPN}/bos.png`,
    dark: `${BASE_URLS.NBA}/celtics/primary/L/logo.svg`,
  },
  BKN: {
    primary: `${BASE_URLS.ESPN}/bkn.png`,
    dark: `${BASE_URLS.NBA}/nets/primary/L/logo.svg`,
  },
  CHA: {
    primary: `${BASE_URLS.ESPN}/cha.png`,
    dark: `${BASE_URLS.NBA}/hornets/primary/L/logo.svg`,
  },
  CHI: {
    primary: `${BASE_URLS.ESPN}/chi.png`,
    dark: `${BASE_URLS.NBA}/bulls/primary/L/logo.svg`,
  },
  CLE: {
    primary: `${BASE_URLS.ESPN}/cle.png`,
    dark: `${BASE_URLS.NBA}/cavaliers/primary/L/logo.svg`,
  },
  DAL: {
    primary: `${BASE_URLS.ESPN}/dal.png`,
    dark: `${BASE_URLS.NBA}/mavericks/primary/L/logo.svg`,
  },
  DEN: {
    primary: `${BASE_URLS.ESPN}/den.png`,
    dark: `${BASE_URLS.NBA}/nuggets/primary/L/logo.svg`,
  },
  DET: {
    primary: `${BASE_URLS.ESPN}/det.png`,
    dark: `${BASE_URLS.NBA}/pistons/primary/L/logo.svg`,
  },
  GSW: {
    primary: `${BASE_URLS.ESPN}/gsw.png`,
    dark: `${BASE_URLS.NBA}/warriors/primary/L/logo.svg`,
  },
  HOU: {
    primary: `${BASE_URLS.ESPN}/hou.png`,
    dark: `${BASE_URLS.NBA}/rockets/primary/L/logo.svg`,
  },
  IND: {
    primary: `${BASE_URLS.ESPN}/ind.png`,
    dark: `${BASE_URLS.NBA}/pacers/primary/L/logo.svg`,
  },
  LAC: {
    primary: `${BASE_URLS.ESPN}/lac.png`,
    dark: `${BASE_URLS.NBA}/clippers/primary/L/logo.svg`,
  },
  LAL: {
    primary: `${BASE_URLS.ESPN}/lal.png`,
    dark: `${BASE_URLS.NBA}/lakers/primary/L/logo.svg`,
  },
  MEM: {
    primary: `${BASE_URLS.ESPN}/mem.png`,
    dark: `${BASE_URLS.NBA}/grizzlies/primary/L/logo.svg`,
  },
  MIA: {
    primary: `${BASE_URLS.ESPN}/mia.png`,
    dark: `${BASE_URLS.NBA}/heat/primary/L/logo.svg`,
  },
  MIL: {
    primary: `${BASE_URLS.ESPN}/mil.png`,
    dark: `${BASE_URLS.NBA}/bucks/primary/L/logo.svg`,
  },
  MIN: {
    primary: `${BASE_URLS.ESPN}/min.png`,
    dark: `${BASE_URLS.NBA}/timberwolves/primary/L/logo.svg`,
  },
  NOP: {
    primary: `${BASE_URLS.ESPN}/nop.png`,
    dark: `${BASE_URLS.NBA}/pelicans/primary/L/logo.svg`,
  },
  NYK: {
    primary: `${BASE_URLS.ESPN}/nyk.png`,
    dark: `${BASE_URLS.NBA}/knicks/primary/L/logo.svg`,
  },
  OKC: {
    primary: `${BASE_URLS.ESPN}/okc.png`,
    dark: `${BASE_URLS.NBA}/thunder/primary/L/logo.svg`,
  },
  ORL: {
    primary: `${BASE_URLS.ESPN}/orl.png`,
    dark: `${BASE_URLS.NBA}/magic/primary/L/logo.svg`,
  },
  PHI: {
    primary: `${BASE_URLS.ESPN}/phi.png`,
    dark: `${BASE_URLS.NBA}/sixers/primary/L/logo.svg`,
  },
  PHX: {
    primary: `${BASE_URLS.ESPN}/phx.png`,
    dark: `${BASE_URLS.NBA}/suns/primary/L/logo.svg`,
  },
  POR: {
    primary: `${BASE_URLS.ESPN}/por.png`,
    dark: `${BASE_URLS.NBA}/blazers/primary/L/logo.svg`,
  },
  SAC: {
    primary: `${BASE_URLS.ESPN}/sac.png`,
    dark: `${BASE_URLS.NBA}/kings/primary/L/logo.svg`,
  },
  SAS: {
    primary: `${BASE_URLS.ESPN}/sas.png`,
    dark: `${BASE_URLS.NBA}/spurs/primary/L/logo.svg`,
  },
  TOR: {
    primary: `${BASE_URLS.ESPN}/tor.png`,
    dark: `${BASE_URLS.NBA}/raptors/primary/L/logo.svg`,
  },
  UTA: {
    primary: `${BASE_URLS.ESPN}/uta.png`,
    dark: `${BASE_URLS.NBA}/jazz/primary/L/logo.svg`,
  },
  WAS: {
    primary: `${BASE_URLS.ESPN}/was.png`,
    dark: `${BASE_URLS.NBA}/wizards/primary/L/logo.svg`,
  },
};