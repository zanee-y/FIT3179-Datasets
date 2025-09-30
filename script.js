// Use your requested format: a vg_1 object + vegaEmbed call.
var vg_1 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 850,
  "height": 520,

  "title": {
    "text": "Malaysia's Secondary School Average Non-Completion Rate by State (2016-2022)",
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
        "graticule": { "extent": [[95, -1], [121, 8]], "step": [1, 1] }
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
        "url": "https://raw.githubusercontent.com/lawchrisss/FIT3179/refs/heads/main/ne_10m_admin_1_states_provinces.json",
        "format": { "type": "topojson", "feature": "states" }
      },
      "transform": [
        {
          "lookup": "properties.Name",
          "from": {
            "data": {
              "url": "https://raw.githubusercontent.com/lawchrisss/FIT3179/refs/heads/main/completion_school_state_avg_gap.csv",
              "format": { "type": "csv" }
            },
            "key": "state",
            "fields": ["avg_completion", "non_completion"]
          }
        },
        {
          "calculate": "datum.properties.Name === 'Penang' ? 'Pulau Pinang' : datum.properties.Name",
          "as": "state_for_tooltip"
        }
      ],
      "mark": {
        "type": "geoshape",
        "stroke": "white",
        "strokeWidth": 0.5
      },
      "encoding": {
        "color": {
          "field": "non_completion",
          "type": "quantitative",
          "scale": { "scheme": "reds" },
          "legend": {
            "title": "Non-completion (%)",
            "orient": "right",
            "direction": "vertical",
            "gradientLength": 180,
            "format": ".2f"
          }
        },
        "tooltip": [
          { "field": "state_for_tooltip", "title": "State" },
          { "field": "avg_completion", "title": "Avg completion (%)", "type": "quantitative", "format": ".2f" },
          { "field": "non_completion", "title": "Non-completion (%)", "type": "quantitative", "format": ".2f" }
        ]
      }
    }
  ],

  "config": {
    "view": { "stroke": null },
    "legend": { "labelFontSize": 11, "titleFontSize": 12 }
  }
};

// Render into div with id="vis"
vegaEmbed("#vis", vg_1, { actions: false })
  .catch(err => {
    console.error(err);
    const box = document.getElementById("err");
    if (box) {
      box.style.display = "block";
      box.textContent = "Visualization error:\n" + (err && err.message ? err.message : String(err));
    }
  });
