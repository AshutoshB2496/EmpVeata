import {Component, OnInit, AfterViewInit} from '@angular/core';
import {TableData} from '../md/md-table/md-table.component';

import * as Chartist from 'chartist';
import {DashboardMobileService} from './dashboardMobile.service';
import {ActivatedRoute, Router} from '@angular/router';

declare const $: any;

declare interface DataTable {
    headerRow: string[];
    dataRows: string[][];
};


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboardMobile.component.html',
    styleUrls: ['dashboardMobile.component.css']
})
export class DashboardMobileComponent implements OnInit, AfterViewInit {

    public dataTable: DataTable;
    selectedZoneSales = 'India';
    selectedPeriodSales = '6';
    selectedZoneAR = 'zone';
    selectedPeriodAR = '6';
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    year = new Date().getFullYear().toString();
    month = this.months[new Date().getMonth()];
    public tableData: TableData;
    Sales;
    message;
    dataArChart;

    constructor(private route: ActivatedRoute,
                private service: DashboardMobileService,
                private router: Router) {
    }

    changeSales() {
        this.getSales();
    }

    changeAR() {
        this.getAR();
    }

    startAnimationForLineChart(chart: any) {
        let seq: any, delays: any, durations: any;
        seq = 0;
        delays = 80;
        durations = 300;
        chart.on('draw', function (data: any) {

            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq = 0;
    }

    startAnimationForBarChart(chart: any) {
        let seq2: any, delays2: any, durations2: any;
        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function (data: any) {
            if (data.type === 'bar') {
                seq2++;
                data.element.animate({
                    opacity: {
                        begin: seq2 * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq2 = 0;
    }

    getSales() {
        this.service.getSales(this.selectedZoneSales, 6).subscribe(value => {
            const ar_north = [];
            const ar_east = [];
            const ar_south = [];
            const ar_west = [];
            const monthsales = [];
            for (let i = 0; i < value.length; i = i + 4) {
                monthsales.push(value[i].month);
                ar_north.push(value[i].sales_actual / 10000000);
            }
            for (let i = 1; i < value.length; i = i + 4) {
                ar_east.push(value[i].sales_actual / 10000000);
            }
            for (let i = 2; i < value.length; i = i + 4) {
                ar_south.push(value[i].sales_actual / 10000000);
            }
            for (let i = 3; i < value.length; i = i + 4) {
                ar_west.push(value[i].sales_actual / 10000000);
            }
            const dataDailySalesChart = {
                labels: monthsales,
                series: [
                    ar_north,
                    ar_east,
                    ar_south,
                    ar_west
                ]
            };

            const optionsDailySalesChart = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),
                chartPadding: {top: 0, right: 0, bottom: 0, left: 0},
            };

            const dailySalesChart = new Chartist.Line('#salesChart', dataDailySalesChart, optionsDailySalesChart);

            this.startAnimationForLineChart(dailySalesChart);
        });
    }

    getSales2() {
        this.service.getSales(this.selectedZoneSales, 6).subscribe(value => {
            const ar_north = [];
            const ar_east = [];
            const ar_south = [];
            const ar_west = [];
            const monthsales = [];
            for (let i = 0; i < value.length; i = i + 4) {
                monthsales.push(value[i].month);
                ar_north.push((value[i].sales_actual / value[i].sales_target) * 100);
            }
            for (let i = 1; i < value.length; i = i + 4) {
                ar_east.push((value[i].sales_actual / value[i].sales_target) * 100);
            }
            for (let i = 2; i < value.length; i = i + 4) {
                ar_south.push((value[i].sales_actual / value[i].sales_target) * 100);
            }
            for (let i = 3; i < value.length; i = i + 4) {
                ar_west.push((value[i].sales_actual / value[i].sales_target) * 100);
            }
            const dataDailySalesChart = {
                labels: monthsales,
                series: [
                    ar_north,
                    ar_east,
                    ar_south,
                    ar_west
                ]
            };

            const optionsDailySalesChart = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),
                chartPadding: {top: 0, right: 0, bottom: 0, left: 0},
            };

            const dailySalesChart = new Chartist.Line('#salesChart2', dataDailySalesChart, optionsDailySalesChart);

            this.startAnimationForLineChart(dailySalesChart);
        });
    }

    getAR() {
        this.service.getAR(this.selectedZoneAR, this.selectedPeriodAR).subscribe(value => {
            const ar_north = [];
            const ar_east = [];
            const ar_south = [];
            const ar_west = [];
            const monthsales = [];
            if (this.selectedZoneAR === 'zone') {
                for (let i = 0; i < value.length; i = i + 4) {
                    monthsales.push(value[i].month);
                    ar_north.push(value[i].ar_actual);
                }
                for (let i = 1; i < value.length; i = i + 4) {
                    ar_east.push(value[i].ar_actual);
                }
                for (let i = 2; i < value.length; i = i + 4) {
                    ar_south.push(value[i].ar_actual);
                }
                for (let i = 3; i < value.length; i = i + 4) {
                    ar_west.push(value[i].ar_actual);
                }
                this.dataArChart = {
                    labels: monthsales,
                    series: [
                        ar_north,
                        ar_east,
                        ar_south,
                        ar_west
                    ]
                };
            } else {
                for (let i = 0; i < value.length; i++) {
                    monthsales.push(value[i].month);
                    ar_north.push(value[i].ar_actual);
                }
                this.dataArChart = {
                    labels: monthsales,
                    series: [
                        ar_north
                    ]
                };
            }
            const optionsArChart = {
                seriesBarDistance: 10,
                axisX: {
                    showGrid: false
                },
                height: '300px',
            };

            const responsiveOptionsArChart: any = [
                ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function (value2: any) {
                            return value2[0];
                        }
                    }
                }]
            ];

            const ArChart = new Chartist.Bar('#ArChart', this.dataArChart,
                optionsArChart, responsiveOptionsArChart);

            this.startAnimationForBarChart(ArChart);
        });
    }

    getPie() {
        this.service.getPerDay().subscribe(value => {
            const sales_pe_pd = [23, 44, 13, 31, 26, 17];
            const monthsales = [];
            for (let i = 0; i < value.length; i++) {
                monthsales.push(value[i].month);
            }
            const dataSalesEmpChart = {
                labels: monthsales,
                series: [
                    sales_pe_pd
                ]
            };

            const optionsSalesEmpChart = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),
                low: 10000,
                chartPadding: {top: 0, right: 0, bottom: 0, left: 0},
            };

            const SalesEmpChart = new Chartist.Line('#chartPreferences', dataSalesEmpChart, optionsSalesEmpChart);

            this.startAnimationForLineChart(SalesEmpChart);
        });
    }

    public ngOnInit() {
        this.route.fragment
            .subscribe(frag => {
                console.log(frag);
                this.router.navigate(['/mobile/reports'], {fragment: frag});
                const element = document.querySelector('#' + frag);
                setTimeout(function () {
                    element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
                }, 1000);
            });
        this.message = this.route.queryParams.subscribe(params => {
            localStorage.setItem('my_login_token', params['token']);

            this.service.getWorstSales().subscribe(value => {
                this.Sales = value;
                this.dataTable = {
                    headerRow: ['#', 'Region', 'Sales Target Achieved', 'MoM Sales Growth', 'YoY Sales Growth'
                        , 'Collection', 'AR (In Days)', 'AR (Amount)'],
                    dataRows: []
                };
                let i = 0;
                for (const sale of this.Sales) {
                    i++;
                    const t = [];
                    t.push('' + i);
                    t.push(sale.geography);
                    t.push(sale.sales_target_achieved);
                    t.push(sale.sales_growth_mom);
                    t.push(sale.sales_growth_yoy);
                    t.push(sale.collection);
                    t.push(sale.ar_actual);
                    t.push(sale.ar_amount);
                    t.push(sale.ar_days_in_prev_month)
                    this.dataTable.dataRows.push(t);
                }
            });

            // Sales Chart (First)
            this.getSales();
            this.getSales2();
            // Sales Chart Ends (First)

            // Meetings Chart Starts
            this.service.getPerDay().subscribe(value => {
                const meetings_pe_pd = [];
                const monthsales = [];
                for (let i = 0; i < value.length; i++) {
                    monthsales.push(value[i].month);
                    meetings_pe_pd.push(value[i].meetings_pe_pd);
                }
                const dataMeetingsChart = {
                    labels: monthsales,
                    series: [
                        meetings_pe_pd
                    ]
                };

                const optionsMeetingsChart = {
                    lineSmooth: Chartist.Interpolation.cardinal({
                        tension: 0
                    }), // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                    chartPadding: {top: 0, right: 0, bottom: 0, left: 0},
                };

                const MeetingsChart = new Chartist.Line('#MeetingsChart', dataMeetingsChart, optionsMeetingsChart);

                this.startAnimationForLineChart(MeetingsChart);

            });
            // Meeting Chart Ends

            // Sales per Employee Chart Starts
            this.service.getPerDay().subscribe(value => {
                const sales_pe_pd = [];
                const monthsales = [];
                for (let i = 0; i < value.length; i++) {
                    monthsales.push(value[i].month);
                    sales_pe_pd.push(value[i].sales_pe_pd);
                }
                const dataSalesEmpChart = {
                    labels: monthsales,
                    series: [
                        sales_pe_pd
                    ]
                };

                const optionsSalesEmpChart = {
                    lineSmooth: Chartist.Interpolation.cardinal({
                        tension: 0
                    }),
                    low: 10000,
                    chartPadding: {top: 0, right: 0, bottom: 0, left: 0},
                };

                const SalesEmpChart = new Chartist.Line('#SalesEmpChart', dataSalesEmpChart, optionsSalesEmpChart);

                this.startAnimationForLineChart(SalesEmpChart);
            });
            // Sales per Employee Chart Ends

            // Collection per Employee Chart Starts
            this.service.getPerDay().subscribe(value => {
                const collection_pe_pd = [];
                const monthsales = [];
                for (let i = 0; i < value.length; i++) {
                    monthsales.push(value[i].month);
                    collection_pe_pd.push(value[i].collection_pe_pd);
                }
                const dataCollectionEmpChart = {
                    labels: monthsales,
                    series: [
                        collection_pe_pd
                    ]
                };

                const optionsCollectionEmpChart = {
                    lineSmooth: Chartist.Interpolation.cardinal({
                        tension: 0
                    }),
                    low: 10000,
                    chartPadding: {top: 0, right: 0, bottom: 0, left: 0},
                };

                const CollectionEmpChart = new Chartist.Line('#CollectionEmpChart', dataCollectionEmpChart, optionsCollectionEmpChart);

                this.startAnimationForLineChart(CollectionEmpChart);
            });
            // Collection per Employee Chart Ends

            // AR Overdue Chart
            this.getAR();
            // AR Overdue Chart Ends

            /*  **************** Coloured Rounded Line Chart - Line Chart ******************** */


            const dataColouredBarsChart = {
                labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Apr', 'May'],
                series: [
                    [287, 385, 490, 554, 586, 698, 695, 752, 788, 846, 944],
                    [67, 152, 143, 287, 335, 435, 437, 539, 542, 544, 647],
                    [23, 113, 67, 190, 239, 307, 308, 439, 410, 410, 509]
                ]
            };

            const optionsColouredBarsChart: any = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 10
                }),
                axisY: {
                    showGrid: true,
                    offset: 40
                },
                axisX: {
                    showGrid: false,
                },
                low: 0,
                high: 1000,
                showPoint: true,
                height: '400px'
            };


            const colouredBarsChart = new Chartist.Line('#colouredBarsChart', dataColouredBarsChart,
                optionsColouredBarsChart);

            this.startAnimationForLineChart(colouredBarsChart);
            this.tableData = {
                headerRow: ['ID', 'Name', 'Salary', 'Country', 'City'],
                dataRows: [
                    ['US', 'USA', '2.920	', '53.23%'],
                    ['DE', 'Germany', '1.300', '20.43%'],
                    ['AU', 'Australia', '760', '10.35%'],
                    ['GB', 'United Kingdom	', '690', '7.87%'],
                    ['RO', 'Romania', '600', '5.94%'],
                    ['BR', 'Brasil', '550', '4.34%']
                ]
            };
            /* ----------==========     Daily New Customers Chart initialization    ==========---------- */
            this.service.getPerDay().subscribe(value => {
                const nc_actual = [];
                const monthsales = [];
                for (let i = 0; i < value.length; i++) {
                    monthsales.push(value[i].month);
                    nc_actual.push(value[i].nc_actual);
                }

                const dataDailySalesChart = {
                    labels: monthsales,
                    series: [
                        nc_actual
                    ]
                };

                const optionsDailySalesChart = {
                    lineSmooth: Chartist.Interpolation.cardinal({
                        tension: 0
                    }),
                    chartPadding: {top: 0, right: 0, bottom: 0, left: 0},
                };

                const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

                this.startAnimationForLineChart(dailySalesChart);
            });
            /*  **************** Overdue Invoices - Pie Chart ******************** */
            this.getPie();
            /* ----------==========     Order Processing Time    ==========---------- */
            this.service.getOrderIssues().subscribe(value => {
                const delayed = [];
                const unfulfilled = [];
                const monthsales = [];
                for (let i = 0; i < value.length; i++) {
                    monthsales.push(value[i].month);
                    delayed.push(value[i].delayed);
                    unfulfilled.push(value[i].unfulfilled);
                }
                const dataMultipleBarsChart = {
                    labels: monthsales,
                    series: [
                        delayed,
                        unfulfilled
                    ]
                };

                const optionsMultipleBarsChart = {
                    seriesBarDistance: 10,
                    axisX: {
                        showGrid: false
                    },
                    height: '150px'
                };

                const responsiveOptionsMultipleBarsChart: any = [
                    ['screen and (max-width: 640px)', {
                        seriesBarDistance: 5,
                        axisX: {
                            labelInterpolationFnc: function (value2: any) {
                                return value2[0];
                            }
                        }
                    }]
                ];

                const multipleBarsChart = new Chartist.Bar('#multipleBarsChart', dataMultipleBarsChart,
                    optionsMultipleBarsChart, responsiveOptionsMultipleBarsChart);

                this.startAnimationForBarChart(multipleBarsChart);

            });
        });
    }

    ngAfterViewInit() {
        $('#datatables').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [
                [10, 15, 25, -1],
                [10, 15, 25, 'All']
            ],
            responsive: true,
            searching: false,
            language: {
                search: '_INPUT_',
                searchPlaceholder: 'Search records',
            }

        });

        const table = $('#datatables').DataTable();

        const breakCards = true;
        if (breakCards === true) {
            // We break the cards headers if there is too much stress on them :-)
            $('[data-header-animation=true]').each(function () {
                const $fix_button = $(this);
                const $card = $(this).parent('.card');
                $card.find('.fix-broken-card').click(function () {
                    const $header = $(this).parent().parent().siblings('.card-header, .card-image');
                    $header.removeClass('hinge').addClass('fadeInDown');

                    $card.attr('data-count', 0);

                    setTimeout(function () {
                        $header.removeClass('fadeInDown animate');
                    }, 480);
                });

                $card.mouseenter(function () {
                    const $this = $(this);
                    const hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
                    $this.attr('data-count', hover_count);
                    if (hover_count >= 20) {
                        $(this).children('.card-header, .card-image').addClass('hinge animated');
                    }
                });
            });
        }
    }

}
