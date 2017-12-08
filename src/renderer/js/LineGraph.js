import {Line} from 'vue-chartjs'

export default {
    extends: Line,
    props:['data'],
    mounted () {
        this.renderChart(this.data, {responsive: true, maintainAspectRatio: false, scales: {
            xAxes: [{
                type: 'time',
                time: {
                    displayFormats: {
                        'millisecond': 'MMM DD',
                        'second': 'MMM DD',
                        'minute': 'MMM DD',
                        'hour': 'MMM DD',
                        'day': 'MMM DD',
                        'week': 'MMM DD',
                        'month': 'MMM DD',
                        'quarter': 'MMM DD',
                        'year': 'MMM DD',
                    }
                }
            }],
        },
        })
    }
}