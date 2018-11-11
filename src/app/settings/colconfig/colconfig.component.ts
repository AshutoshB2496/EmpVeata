import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ConfigServices} from './config-services.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';

declare var $: any;
declare interface ColConfig {
    utilized_columns: any;
    available_columns: any;
}

@Component({
  selector: 'app-colconfig',
  templateUrl: './colconfig.component.html',
    styleUrls: ['colconfig.component.css']
})


export class ColconfigComponent implements OnInit, AfterViewInit {
    possibleValues = [];
    enableNext = false;
    fieldVal = '';
    entities = [];
    utilizedCols = [];
    colConfig: ColConfig;
    colNames = [
        {key: 'String', columns: ['']},
        {key: 'Integer', columns: ['']},
        {key: 'Float', columns: ['']},
        {key: 'Boolean', columns: ['']},
        {key: 'Text', columns: ['']},
        {key: 'Datetime', columns: ['']},
    ];
    doubleSlider = [1, 20];
    anyconstraints = '';
    utlCols = [0, 0, 0, 0, 0, 0];
    avlCols = [0, 0, 0, 0, 0, 0];
    totalCols = [0, 0, 0, 0, 0, 0];
    selectedEntity = '';
    selectedType = '';
    constraints = [];
    isEntitySelected = true;
    optionalValue = '';
    isFieldName = false;
    typeSelected = false;
    anyValue = true;
    fixedValue = 'yes';
    editMode = false;
    showText = '';

    constructor(private service: ConfigServices,
                private loaderService: Ng4LoadingSpinnerService) {}

    /*toggle() {
        this.anyValue = !this.anyValue;
        this.fixedValue = !this.fixedValue;
    }*/

    entitySelected() {
        this.isEntitySelected = true;
    }
    enterFieldName() {
        if (this.fieldVal !== '' && this.fieldVal !== null) {
            this.isFieldName = true;
            console.log(this.fieldVal);
        }
    }

    changeFixedValues(value: string) {
        if (value === 'no') {
            this.possibleValues = [];
        }
    }

    deleteColumn(index: number) {
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                swal(
                    'Deleted!',
                    'Column has been deleted.',
                    'success'
                )
            }
        })
    }

    addColumn() {
        this.editMode = false;
        this.fieldVal = '';
        this.optionalValue = '';
        this.possibleValues = [];
        this.constraints = [];
        /*this.possibleValues = this.utilizedCols[index].validation_rule[1];*/
        this.possibleValues = [];
        this.selectedType = '';
        this.typeSelected = false;
        const move_distance = -8;
        const vertical_level = 0;
        $('div.choice').removeClass('active');
        $('#wizardConfig2 .moving-tab').css({
            'transform': 'translate3d(' + move_distance + 'px, ' + vertical_level +  'px, 0)',
            'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'
        });
    }

    editColumn(index: number) {
        this.editMode = true;
        this.fixedValue = '';
        this.fieldVal = this.utilizedCols[index].virtual_name;
        this.optionalValue = this.utilizedCols[index].validation_rule[0];
        this.constraints = [];
        for (let i = 1; i < this.utilizedCols[index].validation_rule.length; i++) {
            this.constraints.push(this.utilizedCols[index].validation_rule[i]);
        }
        /*this.possibleValues = this.utilizedCols[index].validation_rule[1];*/
        this.possibleValues = ['testvalue1', 'testvalue2', 'testvalue3'];
        this.selectedType = this.utilizedCols[index].type;
        this.typeSelected = true;
        $('div.choice').removeClass('active');
        const $rad = $("input[name='entity'][value='" + this.selectedType + "']");
        $("input[name='entity'][value='" + this.selectedType + "']").prop('checked', true);
        $rad.parent().addClass('active');
        console.log(this.selectedType);
    }
    selectEntity(entity: string) {
        console.log(entity);
        this.refreshAll();
        this.enableNext = true;
        this.utilizedCols = [];
        this.selectedEntity = entity;
        this.loaderService.show();
        this.service.getColumns(this.selectedEntity)
            .subscribe(value => {
                console.log(this.utilizedCols);
                this.showText = 'No custom columns present. Click the add button to add columns';
                this.loaderService.hide();
                this.enableNext = true;
                this.colNames = [
                    {key: 'String', columns: ['']},
                    {key: 'Integer', columns: ['']},
                    {key: 'Float', columns: ['']},
                    {key: 'Boolean', columns: ['']},
                    {key: 'Text', columns: ['']},
                    {key: 'Datetime', columns: ['']},
                ];
                this.colConfig = value.data;
                this.avlCols[0] = +this.colConfig.available_columns.string;
                this.avlCols[1] = +this.colConfig.available_columns.int;
                this.avlCols[2] = +this.colConfig.available_columns.float;
                this.avlCols[3] = +this.colConfig.available_columns.boolean;
                this.avlCols[4] = +this.colConfig.available_columns.text;
                this.avlCols[5] = +this.colConfig.available_columns.datetime;
                for (let i = 0; i < 6; i++) {
                    this.totalCols[i] = this.avlCols[i];
                }
                this.utilizedCols = value.data.utilized_columns;
                for (let col of this.utilizedCols) {
                    switch (col.type) {
                        case 'string' :
                            this.utlCols[0]++;
                            this.totalCols[0]++;
                            this.colNames[0].columns.push(col.virtual_name);
                            break;
                        case 'int' :
                            this.utlCols[1]++;
                            this.totalCols[1]++;
                            this.colNames[1].columns.push(col.virtual_name);
                            break;
                        case 'float' :
                            this.utlCols[2]++;
                            this.totalCols[2]++;
                            this.colNames[2].columns.push(col.virtual_name);
                            break;
                        case 'boolean' :
                            this.utlCols[3]++;
                            this.totalCols[3]++;
                            this.colNames[3].columns.push(col.virtual_name);
                            break;
                        case 'text' :
                            this.utlCols[4]++;
                            this.totalCols[4]++;
                            this.colNames[4].columns.push(col.virtual_name);
                            break;
                        case 'datetime' :
                            this.utlCols[5]++;
                            this.totalCols[5]++;
                            this.colNames[5].columns.push(col.virtual_name);
                            break;
                        default: break;
                    }
                }
                console.log(this.utilizedCols);
                console.log(this.avlCols);
            },
                err => {
                    this.loaderService.hide();
                    this.enableNext = false;
                    this.showSwal('error', err.error.msg);
                });
    }
    showSwal(type, msg) {
        if (type === 'success') {
            swal({
                type: 'success',
                title: 'Successfully Submitted!',
                text: msg,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-rose'

            }).catch(swal.noop)
                .then(okay => {
                    if (okay) {
                        location.reload();
                    }
                });
        } else if (type === 'error') {
            swal({
                type: 'error',
                title: 'Wrong input!',
                text: msg,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-rose'

            }).catch(swal.noop);
        }
    }
    show(str: string) {
        console.log($("input[name='entity']:checked").val());
    }
    refreshAll() {
        this.possibleValues = [];
        this.enableNext = false;
        this.fieldVal = '';
        this.doubleSlider = [1, 20];
        this.utlCols = [0];
        this.avlCols = [0];
        this.totalCols = [0];
        this.anyconstraints = '';
        this.selectedType = '';
        this.constraints = [];
        this.isEntitySelected = true;
        this.optionalValue = 'Required';
        this.isFieldName = false;
        this.typeSelected = false;
        this.anyValue = true;
    }
    chooseOptions(str: string) {
        console.log(str);
        this.selectedType = str;
        this.typeSelected = true;
    }
    submit() {
        const request = {
            'entity' : '',
            'type' : '',
            'virtual_name' : '',
            'possible_values' : [],
            'validation_rule_components' : []
        };
        request.entity = this.selectedEntity;
        request.type = this.selectedType;
        request.virtual_name = this.fieldVal;
        request.validation_rule_components.push(this.optionalValue);
        if (this.selectedType === 'string' && this.possibleValues.length > 0) {
            for (let i = 0; i < this.possibleValues.length; i++) {
                request.possible_values.push(this.possibleValues[i].value);
            }
        }
        for (let i = 0; i < this.constraints.length; i++) {
            request.validation_rule_components.push(this.constraints[i].value);
        }
        /*if (this.anyValue) {
            const t = [];
            t.push('string');
            t.push('min:' + this.doubleSlider[0]);
            t.push('max:' + this.doubleSlider[1]);
            t.push('default:' + this.anyconstraints);
            const opt = $("input[name='fieldType']:checked").val();
            t.push(opt);
            request.validation_rule_components = t;
        } else if (this.fixedValue) {
            const t = [];
            for (let val of this.possibleValues) {
                t.push(val.value);
            }
            request.possible_values = t;
            const t1 = [];
            t1.push('default:' + this.selectedFxdDefVal.value);
            const opt = $("input[name='fieldType']:checked").val();
            t1.push(opt);
            request.validation_rule_components = t1;
        }*/
        console.log(request);
        if (!this.editMode) {
            this.service.addColumns(request)
                .subscribe(value => {
                        console.log(value);
                        this.showSwal('success', value.msg);
                    },
                    err => {
                        this.showSwal('error', err.error.msg);
                    });
        }
    }
    ngOnInit() {
        this.service.getEntities()
            .subscribe(data => {
                this.entities = data;
                this.selectEntity(this.entities[0].entity);
            });
        // Code for the Validator
        const $validator = $('.card-wizard form').validate({
            highlight: function(element) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-danger');
            },
            success: function(element) {
                $(element).closest('.form-group').removeClass('has-danger').addClass('has-success');
            },
            errorPlacement : function(error, element) {
                $(element).append(error);
            }
        });

        // Wizard Initialization
        $('.card-wizard').bootstrapWizard({
            'tabClass': 'nav nav-pills',
            'nextSelector': '.btn-next',
            'previousSelector': '.btn-previous',

            onNext: function(tab, navigation, index) {
                var $valid = $('.card-wizard form').valid();
                console.log($valid);
                if (!$valid) {
                    $validator.focusInvalid();
                    return false;
                }
            },

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

            onTabClick : function(tab: any, navigation: any, index: any){

                const $valid = $('.card-wizard form').valid();

                if (!$valid) {
                    return false;
                } else {
                    return true;
                }
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
                        'opacity': '0',
                        'visibility': 'hidden',
                        'position': 'absolute'
                    });
                } else {
                    $(checkbox).css({
                        'opacity': '1',
                        'visibility': 'visible'
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
                    'transform': 'translate3d(' + move_distance + 'px, ' + vertical_level +  'px, 0)',
                    'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

                });
            }
        });

        $('[data-toggle="wizard-radio"]').click(function() {
            const wizard = $(this).closest('.card-wizard');
            wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
            $(this).addClass('active');
            $(wizard).find('[type="radio"]').removeAttr('checked');
            $(this).find('[type="radio"]').attr('checked', 'true');
        });

        $('[data-toggle="wizard-checkbox"]').click(function(){
            if ( $(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).find('[type="checkbox"]').removeAttr('checked');
            } else {
                $(this).addClass('active');
                $(this).find('[type="checkbox"]').attr('checked', 'true');
            }
        });

        $('.set-full-height').css('height', 'auto');

    }
    ngAfterViewInit() {
        var that = this;
        $('[data-toggle="wizard-radio"]').click(function() {
            /* const str = $("input[name='entity']:checked").val();
             console.log($("input[name='entity']:checked").val());
             that.selectEntity(str);*/
            var entityType = $("input[name='entity']:checked").val();
            that.chooseOptions(entityType);
            const wizard = $(this).closest('.card-wizard');
            wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
            $(this).addClass('active');
            $(wizard).find('[type="radio"]').removeAttr('checked');
            $(this).find('[type="radio"]').attr('checked', 'true');
        });

        $('[data-toggle="wizard-checkbox"]').click(function() {
            if ( $(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).find('[type="checkbox"]').removeAttr('checked');
            } else {
                $(this).addClass('active');
                $(this).find('[type="checkbox"]').attr('checked', 'true');
            }
        });
        $( window ).resize( () => { $('.card-wizard').each(function() {

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
                'transform': 'translate3d(' + move_distance + 'px, ' + vertical_level +  'px, 0)',
                'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'
            });

            $('.moving-tab').css({
                'transition': 'transform 0s'
            });
        });
        });

    }

}
