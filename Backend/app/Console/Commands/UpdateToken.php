<?php

namespace App\Console\Commands;
use App\Models\History;
use App\Models\RegayKarPlans;
use App\Models\AssignedPoi;
use App\Models\Setting;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
class UpdateToken extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:token';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update Sandbox Token';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $settings = Setting::whereIn('key', ['SANDBOX_API_KEY', 'SANDBOX_API_SECRET'])->get()->pluck('value', 'key');
        $response = Http::withHeaders([
           'x-api-key' => $settings['SANDBOX_API_KEY'],
            'x-api-secret' => $settings['SANDBOX_API_SECRET'],
            'x-api-version' => '1.0'
        ])->post('https://api.sandbox.co.in/authenticate');
        
        $data = $response->json();
        if($data['access_token']){
            $update = Setting::where('key', 'SANDBOX_AUTH_TOKEN')->first();
            $update->value = $data['access_token'];
            $update->save();
            $this->info('Updated successfully.');
        }
    }
}
