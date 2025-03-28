<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InvoiceMail extends Mailable
{
    use Queueable, SerializesModels;

    public $name;
    public $fileName;

    public function __construct($name, $fileName)
    {
        $this->name = $name;
        $this->fileName = $fileName;
    }

    public function build()
    {
        return $this->subject('Thank You for Activating Your SKLife Account')
                ->view('mail-invoice')
                ->attach(public_path('storage/invoices/'.$this->fileName), [
                    'mime' => 'application/pdf',
                ])
                ->with([
                    'name' => $this->name
                ]);
            
    }
}
