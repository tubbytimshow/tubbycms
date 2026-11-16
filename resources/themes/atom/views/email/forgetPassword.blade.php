<h1>{{ __('Reset your password') }}</h1>

<p>{{ __('You asked to reset the password for your :hotel account.', ['hotel' => config('app.name')]) }}</p>

<p><a href="{{ $resetUrl }}" style="background:#7c3aed;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:8px;display:inline-block;">{{ __('Reset Password') }}</a></p>

<p>{{ __('This link works once and expires in :minutes minutes.', ['minutes' => config('habbo.password_reset_token_time')]) }}</p>

<p>{{ __('If the button does not work, copy this address into your browser:') }}<br>{{ $resetUrl }}</p>

<p>{{ __('If you did not request this, you can ignore this email.') }}</p>
