package com.axion;

import android.content.res.Configuration;
import android.graphics.Color;
import android.os.Bundle;

import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.PluginHandle;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        registerPlugin(System.class);

        //always register plugins before calling super
        super.onCreate(savedInstanceState);
    }

}
