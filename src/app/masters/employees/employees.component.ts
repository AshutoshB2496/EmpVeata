import {AfterViewInit, Component, OnInit} from '@angular/core';
import { TableData } from '../../md/md-table/md-table.component';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-customers',
  templateUrl: './employees.component.html',
    styleUrls: ['employees.component.css']
})

export class EmployeesComponent implements OnInit, AfterViewInit {
    public tableData1: TableData;
    public dataTable: DataTable;

    ngOnInit() {
        this.tableData1 = {
            headerRow: [ 'Name', 'Country', 'City', 'Sale(₹)'],
            dataRows: [
                ['Dakota Rice', 'India', 'Delhi', '36,738'],
                ['Minerva Hooper', 'India', 'Gurgaon', '23,789'],
                ['Sage Rodriguez', 'India', 'Noida', '56,142'],
                ['Philip Chaney', 'India', 'Faridabad', '38,735'],
                ['Doris Greene', 'India', 'Jabalpur', '63,542'],
                ['Mason Porter', 'India', 'Ghaziabad', '78,615']
            ]
        }

        this.dataTable = {
            headerRow: [ '#', 'Name', 'Email', 'Manager', 'Area', 'Performance', 'Actions', 'View', '' ],
            footerRow: [ '#', 'Name', 'Email', 'Manager', 'Area', 'Performance', 'Actions', 'View', '' ],

            dataRows: [
                ['1', 'Dhananjay', 'stu1@hj.com', 'Munish Bansal', 'Delhi', '-30%', '', '', '' ],
                ['2', 'Chandresh', 'cs@example.com', 'Munish Bansal', 'Delhi', '+18%', '', '', '' ],
                ['3', 'Anshul Garg', 'anshul@simplifii.com', 'Munish Bansal', 'Delhi', 'On Target', '', '', ''],
                ['4', 'Yogesh Choudhary', 'yogi@simplifii.com', 'Munish Bansal', 'Delhi', 'On Target', '', '', '' ],
                ['5', 'Vipul Deora', 'vipul@simplifii.com', 'Munish Bansal', 'Delhi', '+31%', '', '', '']

            ]
        };

        $("#showFilter").click(function(){
            $("#filterContainer").slideToggle();
        });

        // Wizard Initialization
        $('.card-wizard').bootstrapWizard({
            'tabClass': 'nav nav-pills',
            'nextSelector': '.btn-next',
            'previousSelector': '.btn-previous',


            onInit: function(tab: any, navigation: any, index: any){

              // check number of tabs and fill the entire row
              let $total = navigation.find('li').length;
              let $wizard = navigation.closest('.card-wizard');

              let $first_li = navigation.find('li:first-child a').html();
              let $moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
              $('.card-wizard .wizard-navigation').append($moving_div);

              $total = $wizard.find('.nav li').length;
             let  $li_width = 100/$total;

              let total_steps = $wizard.find('.nav li').length;
              let move_distance = $wizard.width() / total_steps;
              let index_temp = index;
              let vertical_level = 0;

              let mobile_device = $(document).width() < 600 && $total > 3;

              if(mobile_device){
                  move_distance = $wizard.width() / 2;
                  index_temp = index % 2;
                  $li_width = 50;
              }

              $wizard.find('.nav li').css('width',$li_width + '%');

              let step_width = move_distance;
              move_distance = move_distance * index_temp;

              let $current = index + 1;

              if($current == 1 || (mobile_device == true && (index % 2 == 0) )){
                  move_distance -= 8;
              } else if($current == total_steps || (mobile_device == true && (index % 2 == 1))){
                  move_distance += 8;
              }

              if(mobile_device){
                  let x: any = index / 2;
                  vertical_level = parseInt(x);
                  vertical_level = vertical_level * 38;
              }

              $wizard.find('.moving-tab').css('width', step_width);
              $('.moving-tab').css({
                  'transform':'translate3d(' + move_distance + 'px, ' + vertical_level +  'px, 0)',
                  'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

              });
              $('.moving-tab').css('transition','transform 0s');
           },

            
            onTabShow: function(tab: any, navigation: any, index: any) {
                let $total = navigation.find('li').length;
                let $current = index + 1;

                const $wizard = navigation.closest('.card-wizard');

                // If it's the last tab then hide the last button and show the finish instead
                if ($current >= $total) {
                    $($wizard).find('.btn-next').hide();
                    $($wizard).find('.btn-finish').show();
                } else {
                    $($wizard).find('.btn-next').show();
                    $($wizard).find('.btn-finish').hide();
                }

                const button_text = navigation.find('li:nth-child(' + $current + ') a').html();

                setTimeout(function(){
                    $('.moving-tab').text(button_text);
                }, 150);

                const checkbox = $('.footer-checkbox');

                if ( index !== 0 ) {
                    $(checkbox).css({
                        'opacity':'0',
                        'visibility':'hidden',
                        'position':'absolute'
                    });
                } else {
                    $(checkbox).css({
                        'opacity':'1',
                        'visibility':'visible'
                    });
                }
                $total = $wizard.find('.nav li').length;
               let  $li_width = 100/$total;

                let total_steps = $wizard.find('.nav li').length;
                let move_distance = $wizard.width() / total_steps;
                let index_temp = index;
                let vertical_level = 0;

                let mobile_device = $(document).width() < 600 && $total > 3;

                if(mobile_device){
                    move_distance = $wizard.width() / 2;
                    index_temp = index % 2;
                    $li_width = 50;
                }

                $wizard.find('.nav li').css('width',$li_width + '%');

                let step_width = move_distance;
                move_distance = move_distance * index_temp;

                $current = index + 1;

                if($current == 1 || (mobile_device == true && (index % 2 == 0) )){
                    move_distance -= 8;
                } else if($current == total_steps || (mobile_device == true && (index % 2 == 1))){
                    move_distance += 8;
                }

                if(mobile_device){
                    let x: any = index / 2;
                    vertical_level = parseInt(x);
                    vertical_level = vertical_level * 38;
                }

                $wizard.find('.moving-tab').css('width', step_width);
                $('.moving-tab').css({
                    'transform':'translate3d(' + move_distance + 'px, ' + vertical_level +  'px, 0)',
                    'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

                });
            }
        });


        
        $('.set-full-height').css('height', 'auto');

    }

    ngAfterViewInit() {
        $('#datatables').DataTable({
            'searching': false,
            'pagingType': 'full_numbers',
            'lengthMenu': [
                [2, 5, 10, -1],
                [2, 5, 10, 'All']
            ],
            responsive: true,
            language: {
                search: '_INPUT_',
                searchPlaceholder: 'Free text search',
            }

        });

        const table = $('#datatables').DataTable();

        $('.card .material-datatables label').addClass('form-group');

        // Initialize moving navigation
        $( window ).resize( () => { $('.card-wizard').each(function(){

            const $wizard = $(this);
            const index = $wizard.bootstrapWizard('currentIndex');
            let $total = $wizard.find('.nav li').length;
            let  $li_width = 100/$total;

            let total_steps = $wizard.find('.nav li').length;
            let move_distance = $wizard.width() / total_steps;
            let index_temp = index;
            let vertical_level = 0;

            let mobile_device = $(document).width() < 600 && $total > 3;

            if(mobile_device){
                move_distance = $wizard.width() / 2;
                index_temp = index % 2;
                $li_width = 50;
            }

            $wizard.find('.nav li').css('width',$li_width + '%');

            let step_width = move_distance;
            move_distance = move_distance * index_temp;

            let $current = index + 1;

            if($current == 1 || (mobile_device == true && (index % 2 == 0) )){
                move_distance -= 8;
            } else if($current == total_steps || (mobile_device == true && (index % 2 == 1))){
                move_distance += 8;
            }

            if(mobile_device){
                let x: any = index / 2;
                vertical_level = parseInt(x);
                vertical_level = vertical_level * 38;
            }

            $wizard.find('.moving-tab').css('width', step_width);
            $('.moving-tab').css({
                'transform':'translate3d(' + move_distance + 'px, ' + vertical_level +  'px, 0)',
                'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'
            });

            $('.moving-tab').css({
                'transition': 'transform 0s'
            });
            });
        });
    }


    currentMgr: string[];
    mgrs = [
      {value: 'mgr-0', viewValue: 'Munish Bansal'},
      {value: 'mgr-1', viewValue: 'Anshul Garg'},
      {value: 'mgr-2', viewValue: 'Mahesh Kumar'},
      {value: 'mgr-3', viewValue: 'Dhananjay Kumar'},
      {value: 'mgr-4', viewValue: 'Chandresh'},

    ];

    currentArea: string[];
    areaids = [
      {value: 'aid-0', viewValue: 'Delhi'},
      {value: 'aid-1', viewValue: 'Noida'},
      {value: 'aid-2', viewValue: 'Chandigarh'},
      {value: 'aid-3', viewValue: 'Moga'},
    ];

    currentRegion: string[];
    regions = [
      {value: 'rid-0', viewValue: 'Region 001'},
      {value: 'rid-1', viewValue: 'Region 002'},
      {value: 'rid-2', viewValue: 'Region 003'},
      {value: 'rid-3', viewValue: 'Region 004'},
      {value: 'rid-4', viewValue: 'Region 005'},
      {value: 'rid-5', viewValue: 'Region 006'},
    ];
}
