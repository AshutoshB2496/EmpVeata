// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormArray} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';

declare const $: any;
interface FileReaderEventTarget extends EventTarget {
    result: string;
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage(): string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
    selector: 'app-wizard-cmp',
    templateUrl: 'incentivewizard.component.html',
    styleUrls: ['incentivewizard.component.css']
})

export class IncentiveWizardComponent implements OnInit, AfterViewInit {

    incentiveForm: FormGroup;
    arAvailable = false;
    custAvailable = false;
    fromValue = [0, 0, 0, 0, 0, 0];
    sales = ['Monthly Sales', 'Quarterly Sales', 'Yearly Sales'];
    salesValue = 100;
    arValue = 0;
    customersValue = 0;
    tempValue = 0;

    constructor() {}

    isFieldValid(form: FormGroup, field: string) {
      return !form.get(field).valid && form.get(field).touched;
    }
    updateValues(ch: string) {
        this.arValue = +this.incentiveForm.value.tab2.ar;
        this.customersValue = +this.incentiveForm.value.tab2.customers;
        if (100 - (this.arValue + this.customersValue) < 0) {
            if (ch === 'a') {
                this.arValue = 0;
            } else {
                this.customersValue = 0;
            }
            this.incentiveForm.patchValue({
                'tab2': {
                    'sales': 100 - this.arValue + this.customersValue,
                    'ar' : this.arValue,
                    'customers': this.customersValue
                }
            });
            this.showSwal('error');
        } else {
            this.salesValue = 100 - (this.arValue + this.customersValue);
            this.incentiveForm.patchValue({
                'tab2': {
                    'sales': this.salesValue
                }
            });
        }
    }

    displayFieldCss(form: FormGroup, field: string) {
      return {
        'has-error': this.isFieldValid(form, field),
        'has-feedback': this.isFieldValid(form, field)
      };
    }
    ngOnInit() {
        this.incentiveForm = new FormGroup({
            tab1: new FormGroup({
                'schemeName': new FormControl(''),
                'basedOn': new FormControl('monthly'),
                'calcBasedOn': new FormControl('sales')
            }),
            tab2: new FormGroup({
                'sales': new FormControl({
                    value: 100,
                    disabled: true
                }),
                'ar': new FormControl({
                    value: 0,
                    disabled: false
                }),
                'customers': new FormControl({
                    value: 0,
                    disabled: false
                })
            }),
            tab3: new FormGroup({
                'algo': new FormControl('variable'),
                'level1': new FormControl(null),
                'from1': new FormControl(0),
                'to1': new FormControl(0),
                'variable1': new FormControl(0),
                'fixed1': new FormControl(0),
                'level2': new FormControl(0),
                'from2': new FormControl({
                    value: 0,
                    disabled: true
                }),
                'to2': new FormControl(0),
                'variable2': new FormControl(0),
                'fixed2': new FormControl(0),
                'level3': new FormControl(0),
                'from3': new FormControl({
                    value: 0,
                    disabled: true
                }),
                'to3': new FormControl(0),
                'variable3': new FormControl(0),
                'fixed3': new FormControl(0),
                'level4': new FormControl(0),
                'from4': new FormControl({
                    value: 0,
                    disabled: true
                }),
                'to4': new FormControl(0),
                'variable4': new FormControl(0),
                'fixed4': new FormControl(0),
                'level5': new FormControl(0),
                'from5': new FormControl({
                    value: 0,
                    disabled: true
                }),
                'to5': new FormControl({
                    value: null,
                    disabled: true
                }),
                'variable5': new FormControl(0),
                'fixed5': new FormControl(0)
            }),
            tab4: new FormGroup({
                'algo': new FormControl('variable'),
                'level1': new FormControl(null),
                'from1': new FormControl(0),
                'to1': new FormControl(0),
                'variable1': new FormControl(0),
                'fixed1': new FormControl(0),
                'level2': new FormControl(0),
                'from2': new FormControl({
                    value: 0,
                    disabled: true
                }),
                'to2': new FormControl(0),
                'variable2': new FormControl(0),
                'fixed2': new FormControl(0),
                'level3': new FormControl(0),
                'from3': new FormControl({
                    value: 0,
                    disabled: true
                }),
                'to3': new FormControl(0),
                'variable3': new FormControl(0),
                'fixed3': new FormControl(0),
                'level4': new FormControl(0),
                'from4': new FormControl({
                    value: 0,
                    disabled: true
                }),
                'to4': new FormControl(0),
                'variable4': new FormControl(0),
                'fixed4': new FormControl(0),
                'level5': new FormControl(0),
                'from5': new FormControl({
                    value: 0,
                    disabled: true
                }),
                'to5': new FormControl({
                    value: null,
                    disabled: true
                }),
                'variable5': new FormControl(0),
                'fixed5': new FormControl(0)
            }),
            tab5: new FormGroup({
                'algo': new FormControl('variable'),
                'level1': new FormControl(null),
                'from1': new FormControl(0),
                'to1': new FormControl(0),
                'variable1': new FormControl(0),
                'fixed1': new FormControl(0),
                'level2': new FormControl(0),
                'from2': new FormControl({
                    value: 0,
                    disabled: true
                }),
                'to2': new FormControl(0),
                'variable2': new FormControl(0),
                'fixed2': new FormControl(0),
                'level3': new FormControl(0),
                'from3': new FormControl({
                    value: 0,
                    disabled: true
                }),
                'to3': new FormControl(0),
                'variable3': new FormControl(0),
                'fixed3': new FormControl(0),
                'level4': new FormControl(0),
                'from4': new FormControl({
                    value: 0,
                    disabled: true
                }),
                'to4': new FormControl(0),
                'variable4': new FormControl(0),
                'fixed4': new FormControl(0),
                'level5': new FormControl(0),
                'from5': new FormControl({
                    value: 0,
                    disabled: true
                }),
                'to5': new FormControl({
                    value: null,
                    disabled: true
                }),
                'variable5': new FormControl(0),
                'fixed5': new FormControl(0)
            })
        });
        /*for (let i = 0; i <= 3; i++) {
            this.addLevel();
        }*/
        // Code for the Validator
        const $validator = $('.card-wizard form').validate({
            rules: {
                firstname: {
                    required: true,
                    minlength: 3
                },
                lastname: {
                    required: true,
                    minlength: 3
                },
                email: {
                    required: true,
                    minlength: 3,
                }
            },

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
                if(!$valid) {
                    $validator.focusInvalid();
                    return false;
                }
            },

            onInit: function(tab: any, navigation: any, index: any) {

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


        // Prepare the preview for profile picture
        $('#wizard-picture').change(function(){
            const input = $(this);

            if (input[0].files && input[0].files[0]) {
                const reader = new FileReader();

                reader.onload = function (e: FileReaderEvent) {
                    $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
                };
                reader.readAsDataURL(input[0].files[0]);
            }
        });

        $('[data-toggle="wizard-radio"]').click(function(){
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
    /*addLevel() {
        (<FormArray>(this.incentiveForm.get('tab3').get('levels'))).push(this.createLevel());
    }
    createLevel(): FormGroup {
        const level = new FormGroup({
            'levelId': new FormControl(),
            'from': new FormControl(),
            'to': new FormControl(),
            'variable': new FormControl(),
            'fixed': new FormControl(),
        });
        this.levels.push(level);
        return level;
    }*/
    ngAfterViewInit() {

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
    onSubmit() {
        this.showSwal('success');
        console.log(this.incentiveForm.value);
    }
    fixedSelect(ch: string, tab: string) {
        if (ch === 'f') {
            for (let i = 1; i < 6; i++) {
                const id = 'variable' + i;
                this.incentiveForm.get(tab).get(id).disable();
                this.incentiveForm.get(tab).get(id).reset();
            }
        } else {
            for (let i = 1; i < 6; i++) {
                const id = 'variable' + i;
                this.incentiveForm.get(tab).get(id).enable();
            }
        }
    }
    updateFrom(id: number) {
        console.log('entered');
        if (id !== 5) {
            const nextFrm = 'from' + +(id + 1);
            console.log(nextFrm);
            const to = 'to' + id;
            console.log(to);
            this.fromValue[id + 1] = +this.incentiveForm.get('tab3').get(to).value + 1;
            console.log(this.incentiveForm.get('tab3').get(nextFrm).value);
            this.incentiveForm.get('tab3').patchValue({
                nextFrm: this.fromValue[id + 1]
            });
        }
    }
    showSwal(type) {
        if (type === 'success') {
            swal({
                type: 'success',
                title: 'Successfully Submitted!',
                text: 'The configurations of the incentive wizard have been set',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-rose'

            }).catch(swal.noop);
        } else if (type === 'error') {
            swal({
                type: 'error',
                title: 'Wrong input!',
                text: 'Total sum cannot be greater than 100',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-rose'

            }).catch(swal.noop);
        }
    }
}
