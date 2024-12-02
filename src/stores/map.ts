// import LayerAPI from "@/api/layer";
import { Map, View } from "ol";
import { defineStore } from "pinia";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import {
  Icon,
  Style,
  Circle as CircleStyle,
  Fill,
  Stroke,
  Text,
} from "ol/style";
export const useMapStore = defineStore("map", {
  state: () => {
    return {
      wardData: [],
      view: new View(),
      map: new Map({}),
      provinceLayer: new VectorLayer({
        source: new VectorSource({
          format: new GeoJSON(),
          url: "/static/layers/state.geojson",
        }),
        visible: true,
        // opacity: 0,
        style: new Style({
          //   fill: new Fill({
          //     color: "#113458",
          //   }),
          stroke: new Stroke({
            color: "#113458",
            width: 1.55,
          }),
        }),
      }),
      districtLayer: new VectorLayer({
        source: new VectorSource({
          format: new GeoJSON(),
          url: "static/layers/district.geojson",
        }),
        visible: false,
        // style: new Style({
        //   fill: new Fill({
        //     color: "rgba(255,255,255,0.4)",
        //   }),
        //   stroke: new Stroke({
        //     color: "#3399CC",
        //     width: 1.25,
        //   }),
        // }),
      }),
      municipalityLayer: new VectorLayer({
        source: new VectorSource(),
        visible: false,
      }),
    };
  },
  actions: {
    async setMap(NewMap: Map, view?: View) {
      if (!view) {
        this.view = NewMap.getView();
      } else {
        this.view = view;
      }
      this.map = NewMap;
    },
    // async getWardData(dcode: number, mcode: number) {
    //   const data = await LayerAPI.getWardData(dcode, mcode);
    //   this.wardData = data;
    // },
  },
});
