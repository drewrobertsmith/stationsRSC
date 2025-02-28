export interface Program {
  Id: string;
  Name: string;
  ArtworkUrl: string;
  Author: string;
  Network: string;
}

export interface Clip {
  Id: string;
  Title: string;
  Description: string;
  AudioUrl: string;
  DurationSeconds: number;
  PublishedUtc: string;
  Season: number;
  Episode: number;
  EpisodeType: string;
}

export interface Station {
  tritonId: string;
  callLetters: string;
  applogoM?: string;
  stream: string;
  fallbackstream?: string;
  name: string;
  backgroundColor: string;
  lat?: number | null;
  lng?: number | null;
}
