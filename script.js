let moodEntries = [];

let moodChart;
const ctx = document.getElementById('moodChart').getContext('2d');

function logMood() {
  const mood = document.getElementById('mood').value;
  const note = document.getElementById('note').value;
  const date = new Date().toLocaleDateString();

  if (mood) {
    moodEntries.push({ mood, note, date }); 
    updateChart(); 
  } else {
    alert("Please select a mood!");
  }
}

function updateChart() {
  const moodCounts = moodEntries.reduce((counts, entry) => {
    counts[entry.mood] = (counts[entry.mood] || 0) + 1;
    return counts;
  }, {});

  const labels = Object.keys(moodCounts); 
  const data = Object.values(moodCounts); 

  if (moodChart) {
    moodChart.data.labels = labels;
    moodChart.data.datasets[0].data = data;
    moodChart.update();
  } else {
    moodChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Mood Trends',
            data: data,
            backgroundColor: ['#FFB6C1', '#FFD700', '#87CEFA', '#98FB98', '#FFA07A'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
      },
    });
  }
}
