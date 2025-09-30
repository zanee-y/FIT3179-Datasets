var vg_1 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 850,
  "height": 520,

  "title": {
    "text": "Malaysia — Electricity Access by State (2022)",
    "fontSize": 18,
    "subtitleFontSize": 12,
    "anchor": "middle"
  },

  "projection": {
    "type": "mercator",
    "center": [108, 4],
    "scale": 2700,
    "translate": [450, 260]
  },

  "layer": [
    {
      "data": {
        "graticule": { "extent": [[95, -5], [120, 8]], "step": [2, 2] }
      },
      "mark": {
        "type": "geoshape",
        "fill": null,
        "stroke": "#e6e6e6",
        "strokeWidth": 0.8
      }
    },
    {
      "data": {
        "url": "https://raw.githubusercontent.com/zanee-y/FIT3179-Datasets/refs/heads/main/ne_10m_admin_1_states_provinces.json",
        "format": { "type": "topojson", "feature": "states" }
      },
      "mark": {
        "type": "geoshape",
        "fill": "#f5f5f5",
        "stroke": "#cccccc",
        "strokeWidth": 0.6
      }
    },
    {
      "data": {
        "url": "https://raw.githubusercontent.com/zanee-y/FIT3179-Datasets/refs/heads/main/ne_10m_admin_1_states_provinces.json",
        "format": { "type": "topojson", "feature": "states" }
      },
      "transform": [
        {
          "lookup": "properties.Name",
          "from": {
            "data": {
              "url": "https://raw.githubusercontent.com/zanee-y/FIT3179-Datasets/refs/heads/main/access_amenities_clean.csv",
              "format": { "type": "csv" }
            },
            "key": "state",
            "fields": ["state", "year", "indicator", "value"]
          }
        },
        { "filter": "datum.indicator == 'Electricity' && datum.year == 2022" }
      ],
      "mark": {
        "type": "geoshape",
        "stroke": "white",
        "strokeWidth": 0.5
      },
      "encoding": {
        "color": {
          "field": "value",
          "type": "quantitative",
          "title": "Electricity Access (%)",
          "scale": { "domain": [0, 100], "scheme": "blues" },
          "legend": {
            "orient": "right",
            "direction": "vertical",
            "gradientLength": 180,
            "format": ".1f"
          }
        },
        "tooltip": [
          { "field": "properties.Name", "title": "State" },
          { "field": "value", "title": "Electricity (%)", "type": "quantitative", "format": ".1f" }
        ]
      }
    }
  ],

  "config": {
    "view": { "stroke": null },
    "legend": { "labelFontSize": 11, "titleFontSize": 12 }
  }
};

// render into div with id="vis"
vegaEmbed("#vis", vg_1, { actions: false }).catch(console.error);
